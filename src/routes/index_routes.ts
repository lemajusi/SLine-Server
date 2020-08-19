import { Router } from 'express';
import { IndexController } from '../controllers/indexcontroller';

let indexController = new IndexController();

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