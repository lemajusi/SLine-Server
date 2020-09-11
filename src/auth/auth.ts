import { Request, Response, NextFunction, text } from 'express';
import { pool } from '../database';
import { hashingService } from './../services/hashing';
import { jwtService } from './../services/jwt';
import { UserDto } from '../models/user';
import { authHandler } from './../handlers/authHandler';

export const authService = new class AuthService{

    public async authService(req: Request, res: Response){

        const user: UserDto = req.body;

        try {
            const response = await pool.query(`SELECT * FROM users WHERE email='${user.email}'`);
            
            if(response.rowCount === 1 && response.rows[0]){
                let dbPass: string = response.rows[0].password;
                let match = await hashingService.comparePasswords(user.password, dbPass)
                                .then(result => result)
                                .catch(error => error);

                if(match){
                    let payload = { "sub": response.rows[0].id }
                    let token = await jwtService.createToken(payload).then(result => result);

                    res.send({
                        "status": 200,
                        "statusText": 'Ok',
                        "message": 'Nombre de usuario y contraseña correctos.',
                        "token": token
                    });
                } else if (!match) throw 'Password no coincide.'

            } else if (response.rows.length === 0 && !response.rows[0]) throw 'Email y/o password no coinciden.';
            
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
            if(authHandler.validateSignUp(req)){
                let user: UserDto = req.body;

                await hashingService.hashPassword(user.password)
                    .then(result => user.password = result)
                    .catch(error => error);
    
                const response = await pool.query(`INSERT INTO users (username, email, password, sexo, fechanac) VALUES ('${user.username}', '${user.email}', '${user.password}', '${user.sexo}', '${user.fechanac}')`);

                if(response.rowCount === 1){
                    const response = await pool.query(`SELECT * FROM users WHERE email='${user.email}'`);

                    if(response.rows[0]){
                        let payload = { "sub": response.rows[0].id }
                        let token = await jwtService.createToken(payload).then(result => result);

                        res.send({
                            status: 200,
                            statusMessage: 'Ok',
                            message: 'Usuario creado exitosamente',
                            token: token
                        });
                    } else throw 'Error al crear token para el nuevo usuario';

                } else throw 'Error al ingresar datos de usuario a la base de datos';

            } else throw 'Faltan datos requeridos';
        
        } catch (error) {
            let err: string = authHandler.errorsSignUp(error);
            res.send({
                status: 403,
                statusText: 'Internal error',
                message: err
            })
        }
    }

    public async checkAuthenticated(req: Request, res: Response, next: NextFunction){
        try {
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