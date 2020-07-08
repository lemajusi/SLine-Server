import {Router} from 'express';
import userController from './../controllers/usercontroller';

class UserRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        //list users
        this.router.get('/', userController.getUsers);
     
        //search by id
        this.router.get('/:dato',userController.getUserById)
     
        //SignUp
        this.router.post('/', userController.createUser);
     
        //borrar
        this.router.delete('/:dato', userController.BorrarUsuario)
     
        //actualizar datos por nombre
        this.router.put('/:dato', userController.ActualizarUsuario)
    }
}

const userRoutes = new UserRoutes()
export default userRoutes.router