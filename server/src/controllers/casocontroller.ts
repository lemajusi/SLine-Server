import {Request, Response}from 'express';
import pool from '../database'

class CasoController{
    public async getCasos(req:Request, res:Response){
        try {
            const response = await pool.query("Select * from casos")
            res.send("hola");
        } catch (error) {
            res.send("no existe");
        }
    }
}
const casoControler = new CasoController()
export default casoController