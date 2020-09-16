import { Request, Response }from 'express';
import { pool } from '../database'
import { CaseDto } from '../models/case';

export const casesController = new class CasesController{

    public async addCaso(req:Request, res:Response){
        try {
            const caseData: CaseDto = req.body;
            const userId: number = req.body.userId;
            
            const response = await pool.query(`INSERT INTO cases(coordenadas, titulo, descripcion, idusuario) values ('${caseData.coordenadas}', '${caseData.titulo}', '${caseData.descripcion}', ${userId});`);
            
            if(response.rowCount === 1){
                res.send({
                    status: 200,
                    message: 'Datos del caso ingresados correctamente.',
                })
            } else throw 'Error al ingresar datos del caso en la base de datos.'
        } catch (error) {
            res.send({
                status: 403,
                statusText: 'Internal error',
                message: error
            })
        }
    }

    public async getCases(req:Request, res:Response){
        try {
            const userId = req.body.userId;
            let response = await pool.query(`SELECT id FROM users WHERE id = ${userId}`);
            
            if(response.rowCount === 1 && response.rows[0].id === userId){
                response = await pool.query("SELECT * FROM cases")
                
                if(response.rows){
                    res.send({
                        status: 200,
                        message: 'Request Successfull',
                        data: response.rows
                    });
                } else throw 'No hay casos registrados';

            } else throw 'No hay concidencia con la id de usuario';
        
        } catch (error) {
            res.send({
                status: 403,
                statusText: "Internal error",
                message: error
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

    public async updateCaso(req:Request, res:Response){
        const caso =  await pool.query("select * from casos where id ='"+req.body.id) 
    } 
}