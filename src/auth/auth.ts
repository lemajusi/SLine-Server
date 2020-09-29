import { Request, Response, NextFunction, text } from 'express';
import { pool } from '../database';
import { hashingService } from './../services/hashing';
import { jwtService } from './../services/jwt';
import { UserDto } from '../models/user';
import { authHandler } from './../handlers/authHandler';

export const authService = new class AuthService{

    public async authService(req: Request, res: Response){

        let user: UserDto = req.body;

        try {
            const response = await pool.query(`SELECT * FROM users WHERE email='${user.email}'`);
            
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
                        "rol": user.rol,
                        "fechaIngreso": user.fecharegistro 
                    }
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
            
            let response = await pool.query(`INSERT INTO users (username, email, password, sexo, fechanac) VALUES ('${user.username}', '${user.email}', '${user.password}', '${user.sexo}', '${user.fechanac}')`);

            if(response.rowCount === 1){
              response = await pool.query(`SELECT id, email, username, rol, fecharegistro FROM users WHERE email='${user.email}'`);
              
              if(response.rowCount === 1){
                user = response.rows[0];    
                let payload = { 
                    "sub": user.id,
                    "username": user.username,
                    "email": user.email,
                    "rol": user.rol,
                    "fechaIngreso": user.fecharegistro 
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
                message: err
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