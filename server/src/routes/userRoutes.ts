import {Router} from 'express';
import userController from '../controllers/usercontroller'
class UserRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
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
    }
}
const userRoutes = new UserRoutes()
export default userRoutes.router