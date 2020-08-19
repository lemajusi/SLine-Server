import { Router } from 'express';
import casoController from '../controllers/casesController'

export class CasesRoutes{
    public router: Router = Router();

    constructor(){
        this.config()
    }

    public config():void{
        this.router.get('/', casoController.getCasos)
        
        //By case id
        this.router.get('/id/:dato', casoController.getCasoById)

        //By user id
        this.router.get('/user/:dato', casoController.getCasoByuserId)

        //Update
        this.router.post('/', casoController.addCaso)
    }
};