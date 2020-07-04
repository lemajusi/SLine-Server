"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HomeController {
    HomePage(req, res) {
        res.json({ message: "home page" });
    }
}
const homeController = new HomeController();
exports.default = homeController;
