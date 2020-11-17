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
        this.router.get('/id', authService.checkAuthenticated, userController.getUserById);
     
        //Profile image
        this.router.post('/profileImage', authService.checkAuthenticated, userController.setProfileImage);

        //Delete user
        this.router.delete('/dlt', authService.checkAuthenticated, userController.deleteUser);
     
        //Update user info
        this.router.put('/update', authService.checkAuthenticated, userController.updateUser);

        // Change password
        this.router.put('/changePassword', authService.checkAuthenticated, userController.changePassword);
    }
}