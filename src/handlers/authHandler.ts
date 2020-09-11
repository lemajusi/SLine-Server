import { Request, Response, NextFunction } from 'express';
import { UserDto } from '../models/user';

let userModel: UserDto;

export const authHandler = new class authHandler{

    public validateSignUp = (req: Request): boolean => {
        if(!req.body){
            return false;
        }
        return true;
    }

    public errorsSignUp = (error: any):string => {
        let err = '';
        if (error.constraint === 'users_username_key'){
            err = 'Nombre de usuario ya esta en uso';
        } 
        
        if (error.constraint === 'users_email_key'){
           return 'Correo electronico en uso';
        }

        if (error.code === 'ETIMEDOUT') {
            err = 'Time out';
        }

        if(err === ''){
            err = error;
        }
        
        return err;
    }
}