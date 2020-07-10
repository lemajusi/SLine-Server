import {Request, Response}from 'express';
import pool from '../database'

class CasoController{
    public async getCasos(req:Request, res:Response){
        try {
            const response = await pool.query("Select * from casos")
            res.send({
                status: 200,
                message: 'Request Successfull',
                data: response.rows
            });
        } catch (error) {
            console.log(error);
            res.send({
                status: 403,
                statusText: "error",
                message: "Can't Get"
            });
        }
    }
    public async getCasoById(req:Request, res:Response){
        try {
            const response = await pool.query("select * from casos where id = '"+req.body.idC+"'")
            res.send({
                status: 200,
                message: 'Request Successfull',
                data: response.rows
            })
        } catch (error) {
            console.log(error)
            res.send({
                status: 403,
                statusText: "Error",

            })
        }
    }
    public async addCaso(req:Request, res:Response){
        try {
            const response = await pool.query("insert into users (username, email, password, sexo, fechanac) values ('"+
            req.body.username+"','"+
            req.body.email+"','"+
            req.body.password+"','"+
            req.body.sexo+"','"+
            req.body.fechanac+"')");

            res.send({
                status: 200,
                message: 'User created successfully',
            })
        
        } catch (error) {
            console.log(error);

            console.log(req.body)

            let err = undefined;

            res.send({
                status: 403,
                statusText: 'Error',
                message: err
            })
        }
    } 
}

const casoController = new CasoController()
export default casoController