import {Router} from 'express';
import userController from './../controllers/usercontroller';

class UserRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        //Get users
        this.router.get('/', userController.getUsers);
     
        // //search by id
        // this.router.get('/:dato',userController.getUserById)
     
        //Sign Up
        this.router.post('/', userController.addUser);
        
        //Login
        this.router.post('/login', userController.authService)
        
        // //borrar
        // this.router.delete('/:dato', userController.deleteUser)
     
        // //actualizar datos por nombre
        // this.router.put('/:dato', userController.updateUser)
    }
}

const userRoutes = new UserRoutes()
export default userRoutes.router