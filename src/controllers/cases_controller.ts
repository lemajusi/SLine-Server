import { Request, Response }from 'express';
import { read } from 'fs';
import { pool } from '../database'
import { CaseDto } from '../models/case';

export const casesController = new class CasesController{

    public async addCase(req:Request, res:Response){
        try {
            let caseData: CaseDto = req.body;
            caseData.id_usuario = req.body.userId;

            const response = await pool.query(`INSERT INTO _case(lat, lng, descripcion, tipo_violencia, id_usuario) values (${caseData.lat}, ${caseData.lng},'${caseData.descripcion}', '${caseData.tipo_violencia}', ${caseData.id_usuario});`);
            
            if(response.rowCount === 1){
                res.send({
                    "status": res.statusCode,
                    "statusText": res.statusMessage,
                    "message": 'Datos ingresados correctamente',
                })
            } else throw 'Datos no ingresados';
        
        } catch (error) {
            res.send({
                "status": res.statusCode,
                "statusMessage": res.statusMessage,
                "message": error
            })
        }
    }

    public async getCases(req:Request, res:Response){
        try {
            const userId = req.body.userId;
            let response = await pool.query(`SELECT c.id_caso, c.descripcion, to_char(c.fecha_registro, 'DD/MM/YYYY') as fecha_registro, c.verificado, c.lat, c.lng, c.tipo_violencia, c.id_usuario, u.username FROM _case c INNER JOIN _user u ON u.id = ${userId}`)

            if(response.rows){
                res.send({
                    "status": 200,
                    "message": 'Request Successfully',
                    "data": response.rows
                });
            } else throw 'No hay casos registrados';

        } catch (error) {
            res.send({
                "status": 403,
                "statusText": "Internal error",
                "message": error
            });
        }
    }

    public async getCaseById(req:Request, res:Response){
        try {
            let userId = +req.body.userId;
            let caseId = +req.params.dato;
            let response = await pool.query(`
                SELECT c.id_caso, c.descripcion, to_char(c.fecha_registro, 'DD/MM/YYYY') as fecha_registro, c.verificado, c.tipo_violencia, c.id_usuario, c.lat, c.lng, u.username FROM _case c 
                INNER JOIN _user u
                ON u.id=${userId}
                WHERE c.id_caso = ${caseId}`);
            
            if(response.rows[0]){
                res.send({
                    status: res.statusCode,
                    statusText: res.statusMessage,
                    message: 'Request Successfull',
                    data: response.rows
                })
            } else throw Error();
        
        } catch (error) { 
            console.log(error)
            res.send({
                status: 403,
                statusText: "Error",
                message: error
            })
        }
    }

    public async getCasoByUserId(req:Request, res:Response){
        try {
            let userId = +req.body.userId;
            let response = await pool.query(`SELECT c.id_caso, c.descripcion, to_char(c.fecha_registro, 'DD/MM/YYYY') as fecha_registro, c.verificado, c.lat, c.lng, c.tipo_violencia, c.id_usuario FROM _case c WHERE c.id_usuario=${userId}`);
            
            if(response.rows.length) {
                res.send({
                    status: res.statusCode,
                    message: res.statusMessage,
                    data: response.rows
                })
            } else throw 'Ninguna fila afectada';
        
        } catch (error) {
            res.send({
                status: res.statusCode,
                statusText: res.statusMessage,
                message: error
            })
        }
    }

    public async updateCase(req:Request, res:Response){
        try{
            let caseData: CaseDto = req.body;
            console.log(caseData)
            const response = await pool.query(`UPDATE _case SET tipo_violencia='${caseData.tipo_violencia}',
                                        descripcion='${caseData.descripcion}', lat=${caseData.lat}, lng=${caseData.lng} WHERE id_caso=${caseData.id_caso}`);
            console.log(response)
            if(response.rowCount === 1){
                res.send({
                    "status": res.statusCode,
                    "statusText": res.statusMessage,
                    "message": 'Datos actualizados correctamente'
                })
            } else throw 'Error al intentar actualizar datos';

        } catch(error) {
            res.send({
                "status": res.statusCode,
                "statusText": res.statusMessage,
                "message": error
            })
        }
    }

    public async deleteCase(req:Request, res:Response){
        try {
            let caseId = +req.params.dato;
            let response = await pool.query(`DELETE FROM _case WHERE id_caso=${caseId}`);

            if(response.rowCount === 1){
                res.send({
                    status: res.statusCode,
                    statusText: res.statusMessage,
                    message: 'Caso eliminado correctamente'
                })
            } else throw 'Ninguna fila ha sido afectada';
        
        } catch (error) {
            res.send({
                status: res.statusCode,
                statusText: res.statusMessage,
                message: error
            })
        }
    }
}
