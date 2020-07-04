import {Request, Response} from 'express';
class IndexController {
    public index (req: Request, res: Response) {
        res.json({message:"start page"})
    }
}
const indexController = new IndexController();
export default indexController