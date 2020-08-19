import { Router } from 'express';
import { UserController } from '../controllers/usersController';

let userController = new UserController();

export class UserRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        //Get users
        this.router.get('/', userController.getUsers);
     
        //Search by id
        this.router.get('/id/:dato',userController.getUserById)
     
        //Delete
        this.router.delete('/dlt/:dato', userController.deleteUser)
     
        //Update
        this.router.put('/update/:dato', userController.updateUser)
    }
}