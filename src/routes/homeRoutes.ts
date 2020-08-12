import { Router } from 'express';
import homeController from '../controllers/homecontroller';

class HomeRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', homeController.HomePage);    
    }
};

export const homeRoutes = new HomeRoutes().router;