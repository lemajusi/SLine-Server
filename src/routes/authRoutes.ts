import { Router } from 'express';
import { AuthService } from '../auth/auth';

let authService = new AuthService();

export class AuthRoutes{

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void{
        //Sign Up
        this.router.post('/signup', authService.signUp);
            
        //Login
        this.router.post('/login', authService.authService)
    }
}