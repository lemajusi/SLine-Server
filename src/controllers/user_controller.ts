import { Request, Response, json } from 'express';
import pool from '../database';
import { HashingService } from './../services/hashing';
import { JwtService } from './../services/jwt';
import { UserDto } from '../models/user';

let hashingService = new HashingService();
let jwtService = new JwtService();

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

        const user: UserDto = req.body;

        try {
            const response = await pool.query(`SELECT password FROM users WHERE username='${user.username}' AND email='${user.email}'`);
            
            if(response.rowCount === 1 && response.rows[0]){
                let dbPass: string = response.rows[0].password; 
                
                if(await hashingService.comparePasswords(user.password, dbPass).then(result => result)){
                    let token = jwtService.createToken(req.body);

                    res.send({
                        "status": 200,
                        "statusText": 'Ok',
                        "message": 'The username and password combination is correct!' 
                    })
                }

                if(!await hashingService.comparePasswords(user.password, dbPass).then(result => result)) throw new Error();
            } else if (response.rows.length === 0 && !response.rows[0]) throw new Error();
            
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
            await hashingService.hashPassword(user.password).then((result: any) => {
                user.password = result;
                console.log(typeof(result));
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

            if (error.constraint === 'users_username_key'){
                err = 'Username is already in use';
            }
            if (error.constraint === 'users_email_key'){
                err = 'Email is already in use';
            }

            res.send({
                status: 403,
                statusText: 'Internal error',
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