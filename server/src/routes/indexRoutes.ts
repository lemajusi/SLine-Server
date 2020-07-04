import {Router} from 'express';
import indexController from '../controllers/indexcontroller'
class IndexRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        //metodos que le pasas al server
        this.router.get('/', indexController.index);
    }
}
const indexRoutes = new IndexRoutes()
export default indexRoutes.router
