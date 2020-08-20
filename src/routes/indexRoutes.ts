import { Router } from 'express';
import { IndexController } from '../controllers/indexController';

let indexController = new IndexController();

export class IndexRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', indexController.index);
    }
};