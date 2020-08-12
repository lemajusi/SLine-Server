import { Router } from 'express';
import { userController } from '../controllers/user_controller';

class UserRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        //Get users
        this.router.get('/', userController.getUsers);
     
        //Search by id
        this.router.get('/id/:dato',userController.getUserById)
     
        //Sign Up
        this.router.post('/signup', userController.signUp);
        
        //Login
        this.router.post('/login', userController.authService)
        
        //Delete
        this.router.delete('/dlt/:dato', userController.deleteUser)
     
        //Update
        this.router.put('/update/:dato', userController.updateUser)
    }
}

export const userRoutes = new UserRoutes().router;