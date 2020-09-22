import { Request, Response, json } from 'express';
import { pool } from '../database';

export const userController = new class UserController {

    public async getUsers(req: Request, res: Response) {
        const userId = req.body.userId;
        console.log("hoila")
        try {
            let response = await pool.query(`SELECT id FROM users WHERE id=${userId}`);

            if(response.rowCount === 1 && response.rows[0].id === userId){
                response = await pool.query('SELECT username, email, fechanac, fecharegistro, sexo FROM users');

                if(response.rows.length){
                    res.send({
                        status: 200,
                        statusText: 'OK',
                        message: 'Request Successfull',
                        data: response.rows
                    })
                } throw 'No existen usuarios en la base de datos.';
            }
        } catch (error) {
            res.send({
                status: res.status,
                statusText: res.statusMessage
            });
        }
    }

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