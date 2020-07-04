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
        //listarpor id
        this.router.get('/:dato',userController.Usuario)
        //listar
        this.router.post('/', userController.CrearUsuario);
        //borrar
        this.router.delete('/:dato', userController.BorrarUsuario)
    }
}
const userRoutes = new UserRoutes()
export default userRoutes.router