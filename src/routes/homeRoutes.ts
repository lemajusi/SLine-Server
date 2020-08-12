import {Router} from 'express';
import homeController from '../controllers/homecontroller'
class HomeRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        //metodos que le pasas al server
        this.router.get('/', homeController.HomePage);    
    }
}
const homeRoutes = new HomeRoutes()
export default homeRoutes.router