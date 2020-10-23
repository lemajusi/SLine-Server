import { Request, Response, NextFunction, text } from 'express';
import { pool } from '../database';
import { hashingService } from './../services/hashing';
import { jwtService } from './../services/jwt';
import { UserDto } from '../models/user';
import { authHandler } from './../handlers/authHandler';

export const authService = new class AuthService{

    public async authService(req: Request, res: Response){
        try {
            let user: UserDto = req.body;
            const response = await pool.query(`SELECT u.username, u.email, u.sexo, to_char(u.fecha_registro, 'DD/MM/YYYY') as fecha_registro, to_char(u.fecha_nacimiento, 'DD/MM/YYYY') as fecha_nacimiento, u.id, u.rol 
                                                FROM _user u
                                                WHERE email='${user.email}'`);
            
            const image_url = await pool.query(`SELECT i.image_url FROM userProfileImage i INNER JOIN _user u
                                                ON i.user_id = ${response.rows[0].id}`);

            if(response.rowCount){
                let dbPass: string = response.rows[0].password;
                let match = await hashingService.comparePasswords(user.password, dbPass)
                                .then(result => result)
                                .catch(error => error);

                if(match){
                    user = response.rows[0];
                    user.image_url = image_url.rows[0];
                    let payload = { 
                        "sub": user.id,
                        "username": user.username,
                        "email": user.email,
                        "sexo": user.sexo,
                        "rol": user.rol,
                        "fecha_registro": user.fecha_registro,
                        "fecha_nacimiento": user.fecha_nacimiento,
                        "image_url": user.image_url
                    }
                    let token = await jwtService.createToken(payload).then(result => result);

                    res.send({
                        "status": res.statusCode,
                        "statusText": res.statusMessage,
                        "token": token
                    });

                } else throw 'Password no coincide.'
            } else throw 'Email y/o password no coinciden.';
            
        } catch (error) {
            res.send({
                status: res.statusCode,
                statusText: res.statusMessage,
                message: error
            });
        }
    }

    public async signUp(req: Request, res: Response){ 
        try {
            let user: UserDto = req.body;

            await hashingService.hashPassword(user.password)
                .then(result => user.password = result)
                .catch(error => error);
            
            let response = await pool.query(`INSERT INTO _user (username, email, password, sexo, fecha_nacimiento) VALUES ('${user.username}', '${user.email}', '${user.password}', '${user.sexo}', '${user.fecha_nacimiento}')`);
           
            if(response.rowCount){
                response = await pool.query(`SELECT u.username, u.email, u.sexo, to_char(u.fecha_registro, 'DD/MM/YYYY') as fecha_registro, to_char(u.fecha_nacimiento, 'DD/MM/YYYY') as fecha_nacimiento, u.id, u.rol 
                                                FROM _user u
                                                WHERE email='${user.email}'`);

                const image_url = await pool.query(`SELECT i.image_url FROM userProfileImage i INNER JOIN _user u
                                                        ON i.user_id = ${response.rows[0].id}`);
                if(response.rowCount){
                    user = response.rows[0];
                    user.image_url = image_url.rows[0];
                    
                    let payload = { 
                        "sub": user.id,
                        "username": user.username,
                        "email": user.email,
                        "sexo": user.sexo,
                        "rol": user.rol,
                        "fecha_registro": user.fecha_registro,
                        "fecha_nacimiento": user.fecha_nacimiento,
                        "image_url": user.image_url
                    }
                
                    let token = await jwtService.createToken(payload).then(result => result);
                
                    res.send({
                    status: 200,
                    statusMessage: 'Ok',
                    message: 'Usuario creado exitosamente',
                    token: token
                })
                } else throw Error();
            } else throw Error();
        
        } catch (error) {
            let err: string = authHandler.errorsChecker(error);
            res.send({
                status: res.statusCode,
                statusText: res.statusMessage,
                message: err || error
            })
        }
    }

    public async checkAuthenticated(req: Request, res: Response, next: NextFunction){
        try {
            console.log(req.header)
            if(!req.header('authorization')){
                return res.send({
                    "status": 401,
                    "statusText": 'Unauthorized',
                    "message": 'Missing Auth Header'
                });
            }
    
            let token:any = req.header('authorization')?.split(' ')[1];
            let payload = await jwtService.decodeToken(token).then(res => res);
    
            if(!payload){
                return res.send({
                    "status": 401,
                    "statusText": 'Unauthorized',
                    "message": 'No tiene carga util'
                });
            }

            req.body.userId = payload.sub;

            next();
        } catch (error) {
            console.log(error);
        }
    }
}