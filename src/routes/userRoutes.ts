import { Router } from 'express';
import userController from './../controllers/usercontroller';

class UserRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        //Get users
        this.router.get('/', userController.getUsers);
     
        //Search by id
        this.router.get('/:dato',userController.getUserById)
     
        //Sign Up
        this.router.post('/', userController.addUser);
        
        //Login
        this.router.get('/login/:dato', userController.authService)
        
        //Delete
        this.router.delete('/:dato', userController.deleteUser)
     
        //Update
        this.router.put('/:dato', userController.updateUser)
    }
}

export const userRoutes = new UserRoutes().router;