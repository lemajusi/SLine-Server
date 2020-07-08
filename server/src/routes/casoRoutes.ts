import { Router } from 'express';

class CasoRoutes{
    public router: Router = Router();
    constructor(){
        this.config()
    }
    public config():void{
        this.router.get('/',)
    }
}
const casoRoutes = new CasoRoutes()
export default casoRoutes.router