import { Request } from 'express';
import { UserDto } from '../models/user';

let userModel: UserDto;

export const authHandler = new class authHandler{

    public errorsChecker = (error: any):string => {
        let err = '';
        if (error.constraint === '_user_username_key'){
            err = 'Nombre de usuario ya esta en uso';
        } 
        
        if (error.constraint === '_user_email_key'){
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