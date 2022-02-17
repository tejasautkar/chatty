import { Router } from 'express';
import { onGetAllUsers, onCreateUser, onGetUserById, onDeleteUserById } from '../controllers/UserController';
import { authorize } from '../middleware/jwt';


const router = Router();

router
  .get('/', onGetAllUsers)
  .post('/', onCreateUser)
  .get('/:id', onGetUserById)
  .delete('/:id',authorize, onDeleteUserById)

export default router;