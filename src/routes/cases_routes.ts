import { Router } from 'express';
import casoController from '../controllers/casocontroller'

class CasesRoutes{
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

export const casesRoutes = new CasesRoutes().router;