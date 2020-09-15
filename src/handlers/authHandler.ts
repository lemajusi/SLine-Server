import { Request } from 'express';
import { UserDto } from '../models/user';

let userModel: UserDto;

export const authHandler = new class authHandler{

    public validateBody = (userData: UserDto): boolean => {
        if(!userData){
            return false;
        }

        if(userData !== userModel){
            return false;
        }

        return true;
    }

    public errorsChecker = (error: any):string => {
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