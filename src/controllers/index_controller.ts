import { Request, Response } from 'express';
import { pool } from '../database';

export const indexController = new class IndexController {
    public async index (req: Request, res: Response) {

        try {
            const response = await pool.query("SELECT NOW()");
            res.json(`Respuesta: ${response.rows[0].now}`)
        } catch (error) {
            console.error(error)
        }

    }
}