import { Router } from "express"
import { deleteMessageById, deleteRoomById } from "../controllers/delete";
import { authorize } from "../middleware/jwt";

const router = Router();

router
  .delete('/room/:roomId', authorize, deleteRoomById)
  .delete('/message/:messageId', authorize, deleteMessageById)

export default router;