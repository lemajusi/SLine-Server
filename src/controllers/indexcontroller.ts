import {Request, Response} from 'express';
import pool from '../database';

export class IndexController {
    public async index (req: Request, res: Response) {
        const result = await pool.query("select now()")
        const respuesta = result.rows[0].now
        console.log(respuesta)
        res.json("respuesta"+ respuesta)
    }
}