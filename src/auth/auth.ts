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
            const response = await pool.query(`SELECT * FROM users WHERE email='${user.email}'`);
            console.log(response.rows[0])
            if(response.rowCount === 1 && response.rows[0]){
                let dbPass: string = response.rows[0].password;
                let match = await hashingService.comparePasswords(user.password, dbPass)
                                .then(result => result)
                                .catch(error => error);

                if(match){
                    user = response.rows[0];    
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
                    console.log(payload)
                    let token = await jwtService.createToken(payload).then(result => result);

                    res.send({
                        "status": 200,
                        "statusText": 'Ok',
                        "message": 'Nombre de usuario y contraseña correctos.',
                        "token": token
                    });
                } else throw 'Password no coincide.'
            } else throw 'Email y/o password no coinciden.';
            
        } catch (error) {
            res.send({
                status: 500,
                statusText: 'Internal error',
                message: error
            });
        };
    }

    public async signUp(req: Request, res: Response){
        try {
            let user: UserDto = req.body;

            await hashingService.hashPassword(user.password)
                .then(result => user.password = result)
                .catch(error => error);
            
            if(user.sexo === "Hombre"){
                user.image_url = "https://res.cloudinary.com/sline-uy/image/upload/v1602080778/male-profile.png"
            }
            if(user.sexo === "Mujer"){
                user.image_url = "https://res.cloudinary.com/sline-uy/image/upload/v1602080775/female-profile.png"
            }
            
            let response = await pool.query(`INSERT INTO users (username, email, password, sexo, fecha_nacimiento, image_url) VALUES ('${user.username}', '${user.email}', '${user.password}', '${user.sexo}', '${user.fecha_nacimiento}', '${user.image_url}')`);
           
            if(response.rowCount === 1){
              response = await pool.query(`SELECT username, email, sexo, fecha_registro, fecha_nacimiento, id, rol, image_url FROM users WHERE email='${user.email}'`);
              
              if(response.rowCount === 1){
                user = response.rows[0];    
                let payload = { 
                    "sub": user.id,
                    "username": user.username,
                    "email": user.email,
                    "sexo": user.sexo,
                    "rol": user.rol,
                    "fecha_registro": user.fecha_registro,
                    "fecha_nacimiento": user.fecha_nacimiento,
                    "iamge_url": user.image_url
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
                status: 403,
                statusText: 'Internal error',
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