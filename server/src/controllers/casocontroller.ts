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
}
const casoController = new CasoController()
export default casoController