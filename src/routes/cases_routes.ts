import { Router } from 'express';
import { authService } from '../auth/auth';
import { casesController } from '../controllers/cases_controller'

export const casesRoutes = new class CasesRoutes{
    public router: Router = Router();

    constructor(){
        this.config()
    }

    public config():void{
        this.router.get('/', authService.checkAuthenticated, casesController.getCases);
        
        //By case id
        this.router.get('/id/:dato', authService.checkAuthenticated, casesController.getCaseById);

        //By user id
        this.router.get('/user/:dato', casesController.getCasoByUserId);

        //Create
        this.router.post('/add', authService.checkAuthenticated, casesController.addCase);
    }
};