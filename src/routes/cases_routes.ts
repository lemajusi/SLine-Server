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
        
        this.router.get('/id/:dato', authService.checkAuthenticated, casesController.getCaseById);

        this.router.get('/user', authService.checkAuthenticated, casesController.getCasoByUserId);

        this.router.post('/add', authService.checkAuthenticated, casesController.addCase);

        this.router.delete('/delete/:dato', authService.checkAuthenticated, casesController.deleteCase);

    }
};