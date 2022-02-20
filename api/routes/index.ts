import { Router } from "express"
import { UserController } from "../controllers/UserController";
import { authorization } from "../middleware/Authorization";
import { IBaseRequest } from "../utils/utilTypes";

const router = Router();
const controller = new UserController();
router.post('/login', (req, res, next) => controller.onLogin(req as IBaseRequest, res, next) );
router.post('/logout',(req, res, next) => authorization(req as IBaseRequest, res, next), (req, res, next) => controller.onLogout(req as IBaseRequest, res, next));


export default router;