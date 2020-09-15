import { Request, Response }from 'express';
import { pool } from '../database'

export const casesController = new class CasesController{
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
        const data = req.body;

        try {
            const response = await pool.query(`INSERT INTO cases(coordenadas, titulo, descripcion, idusuario) values ('{"lat": ${data.coordenadas.lat}, "long": ${data.coordenadas.long}}', '${data.titulo}', '${data.descripcion}', ${data.idusuario});`);
            
            if(response.rowCount === 1){
                res.send({
                    status: 200,
                    message: 'Case created successfully',
                })
            }
        
        } catch (error) {
            res.send({
                status: 403,
                statusText: 'Internal error',
                message: error
            })
        }
    }
    public async updateCaso(req:Request, res:Response){
        const caso =  await pool.query("select * from casos where id ='"+req.body.id) 
    } 
}
