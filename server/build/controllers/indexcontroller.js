"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IndexController {
    index(req, res) {
        const reqs = req.body;
        res.send(reqs);
    }
}
const indexController = new IndexController();
exports.default = indexController;
