import {Request, Response} from 'express';
class HomeController {
    public HomePage (req: Request, res: Response) {
        res.json({message: "home page"})
    }
}
const homeController = new HomeController();
export default homeController