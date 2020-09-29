import { Router } from 'express';
import { authService } from '../auth/auth';
import { casesController } from '../controllers/casesController'

export const casesRoutes = new class CasesRoutes{
    public router: Router = Router();

    constructor(){
        this.config()
    }

    public config():void{
        // Get cases
        this.router.get('/', authService.checkAuthenticated, casesController.getCases)
        
        // Get case by id
        this.router.get('/:id', authService.checkAuthenticated, casesController.getCaseById)

        //Create
        this.router.post('/add', authService.checkAuthenticated, casesController.addCase)
    }
};