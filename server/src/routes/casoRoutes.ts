import { Router } from 'express';
import casoController from '../controllers/casocontroller'
class CasoRoutes{
    public router: Router = Router();
    constructor(){
        this.config()
    }
    public config():void{
        this.router.get('/', casoController.getCasos)
        this.router.get('/', casoController.getCasoById)
    }
}
const casoRoutes = new CasoRoutes()
export default casoRoutes.router