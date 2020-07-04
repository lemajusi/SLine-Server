import {Request,Response} from 'express';
import pool from '../database'
class UserController {
    
    public async Lista (req: Request, res: Response) {
        const result = await pool.query('SELECT * FROM usuario')
        const resultado = result.rows
        res.json(resultado)
    }
    public async Usuario (req: Request, res: Response) {
        const a = req.params.dato
        console.log(a)
        const result = await pool.query("select * from usuario where username = '" + a +"'")
        const resultado = result.rows
        res.json(resultado)
    }
    public async CrearUsuario(req:Request, res: Response){
        const nombre = req.body.username
        try {
            const result = await pool.query("insert into usuario (username, email, password, sexo) values ('"+
            req.body.username+"','"+
            req.body.email+"','"+
            req.body.password+"','"+
            req.body.sexo+"')")
            res.json({massage: "Usuario "+nombre+" a sido registrado!"})
        } catch (error) {
            if (error.constraint == "usuario_username_key"){
                res.json({message:"Este nombre de usuario esta siendo utilizado"})
            }
            if(error.constraint == "usuario_username_key"){
                res.json({message:"esta direccion de email esta siendo utilizada"})
            }
        }
    }
    public async BorrarUsuario(req:Request, res:Response){
        const a = req.params.dato
        try {
            const result = await pool.query("delete from usuario where id = "+a+"")
            res.json({message: "Eliminado"})    
        } catch (error) {
            console.log(error)
            res.json({message: "Peticion no aceptada"})
        }
        
    }
}
const userController = new UserController()
export default userController