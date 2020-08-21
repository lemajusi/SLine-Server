import { Router } from 'express';
import { UserController } from '../controllers/usersController';
import { AuthService } from './../auth/auth';

let userController = new UserController();
let authService = new AuthService();

export class UserRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        //Get users
        this.router.get('/', authService.checkAuthenticated, userController.getUsers);
     
        //Search by id
        this.router.get('/id/:dato',userController.getUserById)
     
        //Delete
        this.router.delete('/dlt/:dato', userController.deleteUser)
     
        //Update
        this.router.put('/update/:dato', userController.updateUser)
    }
}