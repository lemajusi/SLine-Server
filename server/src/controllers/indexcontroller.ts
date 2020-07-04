import {Request, Response} from 'express';
import {Pool} from 'pg'
class IndexController {
    public index (req: Request, res: Response) {
        const reqs = req.body
        res.send(reqs)
    }
}
const indexController = new IndexController();
export default indexController