import { Router } from 'express';
import { indexController } from '../controllers/index_controller';

export const indexRoutes = new class IndexRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', indexController.index);
    }
};