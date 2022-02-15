import { Router } from 'express';
import { onGetAllUsers, onCreateUser, onGetUserById, onDeleteUserById } from '../controllers/user';
import { authorize } from '../middleware/jwt';


const router = Router();

router
  .get('/', authorize, onGetAllUsers)
  .post('/',authorize, onCreateUser)
  .get('/:id',authorize, onGetUserById)
  .delete('/:id',authorize, onDeleteUserById)

export default router;