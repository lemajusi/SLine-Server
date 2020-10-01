import { Router } from 'express';
import { authService } from '../auth/auth';

export const authRoutes = new class AuthRoutes{

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void{
        //Sign Up
        this.router.post('/signup', authService.signUp);
            
        //Login
        this.router.post('/login', authService.authService);
    }
}