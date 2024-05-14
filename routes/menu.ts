import express from "express";
import menusController from "../controllers/menu-controller";
import validateToken from "../middleware/validateToken";

const router = express.Router();


router.get('/', validateToken, menusController.getmenus);

export default router;