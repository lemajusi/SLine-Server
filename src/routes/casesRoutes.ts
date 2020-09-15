import { Router } from 'express';
import { casesController } from '../controllers/casesController'

export const casesRoutes = new class CasesRoutes{
    public router: Router = Router();

    constructor(){
        this.config()
    }

    public config():void{
        this.router.get('/', casesController.getCasos)
        
        //By case id
        this.router.get('/id/:dato', casesController.getCasoById)

        //By user id
        this.router.get('/user/:dato', casesController.getCasoByuserId)

        //Update
        this.router.post('/add', casesController.addCaso)
    }
};