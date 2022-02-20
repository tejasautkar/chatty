import { Router } from "express"
import { deleteMessageById, deleteRoomById } from "../controllers/delete";

const router = Router();

router
  .delete('/room/:roomId', () =>  deleteRoomById)
  .delete('/message/:messageId', () =>  deleteMessageById)

export default router;