import {Request,Response} from 'express';
import pool from '../database'
class UserController {
    public async Lista (req: Request, res: Response) {
        try {
            const result = await pool.query('SELECT * FROM usuario')
            const resultado = result.rows
            res.json(resultado)
        } catch (error) {
            res.json({message: "no se pueden obtener usuarios"})
            console.log(error)
        }
        
    }
    public async Usuario (req: Request, res: Response) {
        const result = await pool.query("select * from usuario where username = '" + req.params.dato +"'")
        const resultado = result.rows
        if(resultado[0] == null){
            res.json("no existe ese usuario")
        }else{
            res.json(resultado)            
        }
    }
    public async CrearUsuario(req:Request, res: Response){
        const nombre = req.body.username
        if(req.body.username == undefined){
            res.json("nombre indefinifo")
        }
        if(req.body.email == undefined){
            res.json("email indefinido")
        }
        if(req.body.password == undefined){
            res.json("password indefinido")
        }
        if(req.body.fechanac == undefined){
            res.json("fecha Nacimiento indefinido")
        }
        if(req.body.sexo == undefined){
            res.json("sexo indefinido")
        }
        else{
            try {
                const result = await pool.query("insert into usuario (username, email, password, fechanac, sexo) values ('"+
                req.body.username+"','"+
                req.body.email+"','"+
                req.body.password+"','"+
                req.body.fechanac+"','"+
                req.body.sexo+"')")
                res.json({massage: "Usuario "+nombre+" a sido registrado!"})
            } catch (error) {
                if (error.constraint == "usuario_username_key"){
                    res.json({message:"Este nombre de usuario esta siendo utilizado"})
                }
                if (error.constraint == "usuario_email_key"){
                    res.json({message:"esta direccion de email esta siendo utilizada"})
                }
                if (error.column == undefined){
                    res.json({massage:"mal ingreso de columna"})
                }
                else{
                    res.json("algun tipo de error desconocido")
                    console.log(error)
                }
            }
        }
        
    }
    public async ActualizarUsuario(req:Request, res:Response){
        const result = await pool.query("select * from usuario where username = '" + req.params.dato +"'")
        const a = result.rows
        console.log(result.rows)
        if(req.body.username == undefined){
            res.json("username indefinido")
        }if(req.body.email == undefined){
            res.json("email indefinido")
        }if(req.body.password == undefined){
            res.json("password indefinido")
        }if(req.body.fechanac == undefined){
            res.json("fecha Nacimiento indefinido")
        }if(req.body.sexo == undefined){
            res.json("sexo indefinido")
        }if(a[0] == null){
            res.json("no existe ese usuario")
        }else{
            try {
                const result = await pool.query("update usuario set username='"+ req.body.username+
                "', email='"+req.body.email+
                "', password='"+req.body.password+
                "', sexo='"+req.body.sexo+
                "', fechanac='"+req.body.fechanac+"' where username = '"+req.params.dato+"'")
                res.json({massage: "Usuario "+req.body.username+" a sido actualizado!"})
                
            } catch (error) {
                console.log("Actuaulizar"+error)
                if (error.column == undefined){
                    res.json("columna indefinida")
                }
                if (error.constraint == "usuario_username_key"){
                    res.json({message:"Este nombre de usuario esta siendo utilizado"})
                }
                if (error.constraint == "usuario_email_key"){
                    res.json({message:"esta direccion de email esta siendo utilizada"})
                }else{
                    res.json("algun tipo de error desconocido")
                }
            }
        }
    }
    public async BorrarUsuario(req:Request, res:Response){
        const a = req.params.dato
        try {
            const result = await pool.query("delete from usuario where username = '"+a+"'")
            res.json({message: "Eliminado"})    
        } catch (error) {
            console.log(error)
            res.json({message: "Peticion no aceptada"})
        }
    }
}
const userController = new UserController()
export default userController