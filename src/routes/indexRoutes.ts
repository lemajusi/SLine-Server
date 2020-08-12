import { Router } from 'express';
import indexController from '../controllers/indexcontroller';

class IndexRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', indexController.index);
    }
};

export const indexRoutes = new IndexRoutes().router;