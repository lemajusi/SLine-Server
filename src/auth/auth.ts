import { Request, Response, NextFunction } from 'express';
import pool from '../database';
import { HashingService } from './../services/hashing';
import { JwtService } from './../services/jwt';
import { UserDto } from '../models/user';

let hashingService = new HashingService();
let jwtService = new JwtService();

export class AuthService{

    public async authService(req: Request, res: Response){

        const user: UserDto = req.body;

        try {
            const response = await pool.query(`SELECT * FROM users WHERE email='${user.email}'`);
            
            if(response.rowCount === 1 && response.rows[0]){
                let dbPass: string = response.rows[0].password;
                let match = await hashingService.comparePasswords(user.password, dbPass).then(result => result);

                if(match){
                    let payload = { "sub": response.rows[0].id }
                    let token = await jwtService.createToken(payload).then(result => result);

                    res.send({
                        "status": 200,
                        "statusText": 'Ok',
                        "message": 'The username and password combination is correct!',
                        "token": token 
                    });
                }

            } else if (response.rows.length === 0 && !response.rows[0]) throw new Error('Email y/o password no coinciden.');
            
        } catch (error) {
            
            res.send({
                status: 500,
                statusText: 'Internal error',
                message: 'Email y/o password no coinciden.'
            });
        };
    };

    public async signUp(req: Request, res: Response){
        
        let user: UserDto = req.body;

        try {
            await hashingService.hashPassword(user.password).then(result => {
                user.password = result;
            });

            const response = await pool.query(`INSERT INTO users (username, email, password, sexo, fechanac) VALUES ('${user.username}', '${user.email}', '${user.password}', '${user.sexo}', '${user.fechanac}')`);

            if(response.rowCount === 1){
                res.send({
                    status: 200,
                    statusMessage: 'Ok',
                    text: 'User created successfully'
                })
            } else if (response.rowCount === 0) throw Error();
        
        } catch (error) {
            let err: string = '';
            console.log(error)

            if (error.constraint === 'users_username_key'){
                err = 'Username is already in use';
            } else if (error.constraint === 'users_email_key'){
                err = 'Email is already in use';
            } else if ( err === '' ){
                err = 'Algun otro error'
            }
            
            res.send({
                status: 403,
                statusText: 'Internal error',
                message: err
            })
        }
    };

    public async checkAuthenticated(req: Request, res: Response){
        try {
            if(!req.header('authorization')){
                return res.send({
                    "status": 401,
                    "statusText": 'Unauthorized',
                    "message": 'Missing Auth Header'
                });
            }
    
            let token: any = req.header('authorization')?.split(' ')[1];
            let payload = await jwtService.decodeToken(token).then(res => res);
    
    
            if(!payload){
                return res.send({
                    "status": 401,
                    "statusText": 'Unauthorized',
                    "message": 'Missing Auth Invalid'
                });
            }

            req.body = payload;

        } catch (error) {
            console.log(error);
        }
    }
}