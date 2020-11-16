import { Request, Response } from 'express';
import { pool } from '../database';
import { v2 as cloudinary } from 'cloudinary';
import { UserDto } from '../models/user';
import { jwtService } from '../services/jwt';

export const userController = new class UserController {

    public async setProfileImage(req: Request, res: Response){
        try {
            console.log(req.body);
            const data = {
                title:  req.body.title,
                image: req.body.image
            }

            cloudinary.uploader.upload(data.image)
                .then(async (image) => {
                    const response = await pool.query(`INSERT INTO userProfileImage(title, cloudinary_id, image_url, user_id) VALUES ('${data.title}', '${image.public_id}', '${image.secure_url}', ${req.body.userId}) RETURNING *`);
                
                    let result = response.rows[0];

                    // send success response
                    res.status(201).send({
                        status: "success",
                        data: {
                            message: "Image Uploaded Successfully",
                            title: result.title,
                            cloudinary_id: result.cloudinary_id,
                            image_url: result.image_url,
                        },
                    })
                })
                .catch((error) => {
                    res.send({
                        message: "error al cargar imagen",
                        error,
                    })
                })
        } catch (error) {
            
        }
    }

    public async getUsers(req: Request, res: Response) {
        const userId = req.body.userId;
        try {
            let response = await pool.query(`SELECT id FROM _user WHERE id=${userId}`);

            if(response.rowCount === 1 && response.rows[0].id === userId){
                response = await pool.query('SELECT username, email, fechanac, fecharegistro, sexo FROM _user');

                if(response.rows.length){
                    res.send({
                        status: 200,
                        statusText: 'OK',
                        message: 'Request Successfull',
                        data: response.rows
                    })
                } throw 'No existen usuarios en la base de datos.';
            }
        } catch (error) {
            res.send({
                status: res.status,
                statusText: res.statusMessage
            });
        }
    }

    public async getUserById(req: Request, res: Response) {
        try {
            let userId = +req.body.userId;
            const response = await pool.query(`SELECT username, email, to_char(fecha_nacimiento, 'DD/MM/YYYY') as fecha_nacimiento, sexo FROM _user WHERE id = ${userId}`)
            
            let user: UserDto = response.rows[0];
            
            if(response.rowCount !== 0){
                const image_url = await pool.query(`SELECT image_url FROM userProfileImage WHERE user_id = ${userId}`);

                if(image_url.rows[0]){
                    user.image_url = image_url.rows[0]; 
                }

                res.send({
                    status: res.statusCode,
                    message: "User found successfully",
                    data: user
                })
            }
        } catch (error) {
            console.log(error)
            res.send({
                status: res.statusCode,
                statusText: "User not found"
            })
        }
    }
        
    public async updateUser(req: Request, res: Response){
        try {
            let user: UserDto = req.body;
            user.id = req.body.userId;

            let response = await pool.query(`UPDATE _user SET username = '${user.username}', email = '${user.email}', sexo = '${user.sexo}', fecha_nacimiento = '${user.fecha_nacimiento}' WHERE id = ${user.id}`);
            user  = response.rows[0];

            response  = await pool.query(`SELECT u.username, u.email, u.sexo, to_char(u.fecha_registro, 'MM-DD-YYYY') as fecha_registro, to_char(u.fecha_nacimiento, 'MM-DD-YYYY') as fecha_nacimiento, u.id, u.rol 
                                            FROM _user u
                                            WHERE email='${user.email}'`);
            
            const image_url = await pool.query(`SELECT i.image_url FROM userProfileImage i INNER JOIN _user u
                                                        ON i.user_id = ${response.rows[0].id}`);
            
            if(response.rows[0]){
                user = response.rows[0];
                user.image_url = image_url.rows[0];
                
                let payload = { 
                    "sub": user.id,
                    "username": user.username,
                    "email": user.email,
                    "sexo": user.sexo,
                    "rol": user.rol,
                    "fecha_registro": user.fecha_registro,
                    "fecha_nacimiento": user.fecha_nacimiento,
                    "image_url": user.image_url
                }
            
                let token = await jwtService.createToken(payload).then(result => result);
            
                res.send({
                status: 200,
                statusMessage: 'Ok',
                message: 'Usuario creado exitosamente',
                token: token
                })
            } else throw 'Error al actualizar datos';
        } catch (error) {
            console.log(error);
            res.send({
                "status": res.statusCode,
                "message": JSON.stringify(error)
            })

        }
    }

    public async deleteUser(req:Request, res:Response){
        const result = await pool.query("select * from usuario where username = '" + req.params.dato +"'")
        const a = result.rows
        console.log(result.rows)
        if(a[0] == null){
            res.sendStatus(403).send({
                statusText: "No existe este Usuario"
            })
        }else{
            try {
                const result = await pool.query("delete from usuario where username = '"+req.params.dato+"'")
                res.send({
                    status: 200,
                    statusText: "Usuario eliminado"
                })    
            } catch (error) {
                console.log(error)
                let err = "Error al eliminar Usuario"
                res.send({
                    status: 403,
                    statusText: err
                })
            }
        }
    }
};