import {Router} from 'express';
import userController from '../controllers/usercontroller'
class UserRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
<<<<<<< Updated upstream
        //rutas
        //listar todos
        this.router.get('/', userController.Lista);
        //listar por nombre
        this.router.get('/:dato',userController.Usuario)
        //listar
        this.router.post('/', userController.CrearUsuario);
        //borrar
        this.router.delete('/:dato', userController.BorrarUsuario)
        //actualizar datos por nombre
        this.router.put('/:dato', userController.ActualizarUsuario)
=======

        //Get users
        this.router.get('/', userController.getUsers);
     
        // //search by id
        // this.router.get('/:dato',userController.getUserById)
     
        //Sign Up
        this.router.post('/', userController.addUser);
        
        //Login
        this.router.post('/login/', userController.authService)
        
        //borrar
        this.router.delete('/:dato', userController.deleteUser)
     
        // //actualizar datos por nombre
        this.router.put('/:dato', userController.updateUser)
>>>>>>> Stashed changes
    }
}
const userRoutes = new UserRoutes()
export default userRoutes.router