import { Router } from "express"
import { onLogin, onLogout } from "../controllers/user";
import { authorize } from "../middleware/jwt";

const router = Router();

router.post('/login', onLogin );
router.post('/logout', authorize, onLogout);


export default router;