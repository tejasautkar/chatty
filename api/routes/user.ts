import { Response, Router } from 'express';
import { UserController } from '../controllers/UserController';
import { authorization } from '../middleware/Authorization';
import { IBaseRequest } from '../utils/utilTypes';


const router = Router();
const controller = new UserController();
router
  .get('/', (req, res, next) => authorization(req as IBaseRequest, res, next), (req, res, next) => controller.onGetAllUsers(req as unknown as IBaseRequest, res, next))
  .post('/', (req, res, next) => { controller.onCreateUser(req as unknown as IBaseRequest, res, next) })
  .get('/:id',(req, res, next) => authorization(req as unknown as IBaseRequest, res, next), (req, res, next) => authorization(req as unknown as IBaseRequest, res, next), (req, res, next) => controller.onGetUserById(req as unknown as IBaseRequest, res, next))
  .delete('/:id',(req, res, next) => authorization(req as unknown as IBaseRequest, res, next), (req, res, next) => authorization(req as unknown as IBaseRequest, res, next), (req, res, next) => controller.onDeleteUserById(req as unknown as IBaseRequest, res, next))

export default router;