import { Request, Response, text } from 'express';
import pool from '../database';
import jwt from 'jwt-simple';

const bcrypt = require('bcrypt');

import { UserDto } from '../models/user';

class UserController {

    public async getUsers(req: Request, res: Response) {
        try {
            const response = await pool.query('SELECT * FROM users');
            res.send({
                status: 200,
                statusText: 'OK',
                message: 'Request Successfull',
                data: response.rows
            })
        } catch (error) {
            console.error(error);
            res.send({
                status: res.status,
                statusText: res.statusMessage
            });
        }
    }

    public async authService(req: Request, res: Response){

        try {
            const response = await pool.query(`SELECT * FROM users WHERE email='${req.body.email}' AND password='${req.body.password}'`);
            
            if(response.rows.length === 1){

                let payload = response.rows[0];
                let secretKey = "Mb18jl5OMdq8gl5Eu6aqd-YgdQu7E1d3-mdg3FFaarPNB40IJgFZgOBUfbd_o9x1";
                let token = jwt.encode(payload, secretKey);

                res.send({
                    status: 200,
                    statusText: 'OK',
                    message: 'User found',
                    token: token
                })

            } else if (response.rows.length !== 1) throw new Error();
            
        } catch (error) {
            console.error(error);

            res.send({
                status: 500,
                statusText: 'Internal error',
                message: 'Email y/o password no coinciden.'
            });
        };
    };

    public async getUserById(req: Request, res: Response) {
        try {
            const response = await pool.query("SELECT * FROM users WHERE id = '" + req.params.dato +"'")
            if(response.rows == null){
                res.send({
                    status: 403,
                    statusText: "error",
                    message: "This user doesn't exist"
                })
            }
            else{
                res.json({
                    status: 200,
                    message: 'Request Successfull',
                    data: response.rows
                })            
            }
        } catch (error) {
            console.log(error)
            res.send({
                status: 404,
                statusText: "error"
            })
        }
    }
    
    public async signUp(req: Request, res: Response){
        
        let user: UserDto = req.body;

        try {
            user.password = await bcrypt.hash(user.password, 10);

            const response = await pool.query(`INSERT INTO users (username, email, password, sexo, fechanac) VALUES ('${user.username}', '${user.email}', '${user.password}', '${user.sexo}', '${user.fechanac}')`);

            if(response.rowCount === 1){
                res.send({
                    status: 200,
                    statusMessage: 'Ok',
                    text: 'User created successfully'
                })
            } else throw Error
        
        } catch (error) {
            let err: string = error.constraint;

            if (error.constraint === 'users_username_key'){
                err = "Nombre de usuario duplicado";
            }
            if (error.constraint === 'users_email_key'){
                err = "Correo electronico duplicado";
            }

            res.send({
                status: 403,
                statusText: 'Error',
                message: err
            })
        }
    } 

    
    public async updateUser(req:Request, res:Response){
        const result = await pool.query("select * from usuario where username = '" + req.params.dato +"'")
        const a = result.rows
        console.log(result.rows)
        if(a[0] == null){
            res.send({
                status: 403,
                statusText: "Error",
                message:"This user doesn't exist"
            })
        }else{
            try {
                const result = await pool.query("update usuario set username='"+ req.body.username+
                "', email='"+req.body.email+
                "', password='"+req.body.password+
                "', sexo='"+req.body.sexo+
                "', fechanac='"+req.body.fechanac+"' where username = '"+req.params.dato+"'")
                res.send({
                    status: 200,
                    statusText: "Updated Succesfully"
                })
                
            } catch (error) {
                console.log(error)
                let err = undefined;
                if (error.constraint == "usuario_username_key"){
                    err = "Usuario duplicado.";
                }
                if (error.constraint == "usuario_email_key"){
                    err = "Email duplicado.";
                }
                res.send({
                    status: 403,
                    statusText: "Error de Datos",
                    message: err
                })
            }
        }
    }
    
    public async deleteUser(req:Request, res:Response){
        const result = await pool.query("select * from usuario where username = '" + req.params.dato +"'")
        const a = result.rows
        console.log(result.rows)
        if(a[0] == null){
            res.sendStatus(403).send({
                statusText: "No existe este Usuario"
            })
        }else{
            try {
                const result = await pool.query("delete from usuario where username = '"+req.params.dato+"'")
                res.send({
                    status: 200,
                    statusText: "Usuario eliminado"
                })    
            } catch (error) {
                console.log(error)
                let err = "Error al eliminar Usuario"
                res.send({
                    status: 403,
                    statusText: err
                })
            }
        }
    }
};

export const userController = new UserController();