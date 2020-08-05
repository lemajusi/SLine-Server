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
            const response = await pool.query("select * from casos where idcaso = '"+req.params.dato+"'")
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
    public async getCasoByuserId(req:Request, res:Response){
        try {
            const response = await pool.query("select * from casos where idusuario = '"+req.params.dato+"'")
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
            const response = await pool.query("insert into casos(titulo, descripcion, idusuario) values ('"+
            req.body.titulo+"','"+
            req.body.descripcion+"','"+
            req.body.idusaurio+"')");

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
    public async updateCaso(req:Request, res:Response){
        const caso =  await pool.query("select * from casos where id ='"+req.body.id) 
    } 
}

const casoController = new CasoController()
export default casoController