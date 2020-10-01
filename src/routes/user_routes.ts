import { Router } from 'express';
import { userController } from '../controllers/users_controller';
import { authService } from '../auth/auth';


export const userRoutes = new class UserRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        //Get users
        this.router.get('/', authService.checkAuthenticated, userController.getUsers);
     
        //Search by id
        this.router.get('/id/:dato', userController.getUserById)
     
        //Delete
        this.router.delete('/dlt/:dato', userController.deleteUser)
     
        //Update
        this.router.put('/update/:dato', userController.updateUser)
    }
}