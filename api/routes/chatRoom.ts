import { Router } from "express"
import { getConversationByRoomId, getRecentConversation, initiate, markConversationReadByRoomId, postMessage } from "../controllers/chatRoom";

const router = Router();

router
  .get('/',() => getRecentConversation)
  .get('/:roomId',() =>  getConversationByRoomId)
  .post('/initiate',() =>  initiate)
  .post('/:roomId/message',() =>  postMessage)
  .put('/:roomId/mark-read',() =>  markConversationReadByRoomId)

export default router;