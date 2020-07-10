import { Router } from 'express';
import casoController from '../controllers/casocontroller'
class CasoRoutes{
    public router: Router = Router();
    constructor(){
        this.config()
    }
    public config():void{
        this.router.get('/', casoController.getCasos)
        
        //casos por id 
        this.router.get('/id/:dato', casoController.getCasoById)

        //casos de usuario Perfil
        this.router.get('/user/:dato', casoController.getCasoByuserId)

        //update caso
        this.router.post('/', casoController.addCaso)
    }
}
const casoRoutes = new CasoRoutes()
export default casoRoutes.router