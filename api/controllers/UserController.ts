import { NextFunction, Response } from "express";
import { httpStatusCode, IBaseRequest } from "../utils/utilTypes";
import { validateUser } from '../models/User';
import { logger } from "../utils/Logger";
import { UserService } from "../services/UserService";
import BaseController from "../utils/BaseContoller";
import { ResponseMessage } from "../utils/ResponseMessage";

export class UserController extends BaseController {
    private readonly userService: UserService;

    constructor() {
        super();
        this.userService = new UserService();
    }

    async onGetAllUsers(req: IBaseRequest, res: Response, next: NextFunction) {
        let obj = new ResponseMessage();
        try {
            const data = await this.userService.findAllUsersService();
            obj.data = data;
            this.createResponse.successRes(res, obj);
        } catch (error) {
            logger.error(`UserController findAllUsers - ${error}`);
            next(error);
        }
    }
    async onGetUserById(req: IBaseRequest, res: Response, next: NextFunction) {
        let obj = new ResponseMessage();
        try {
            const id: string | undefined = req?.params?.id;
            const data = await this.userService.findOneByIdService(id);
            if (!data) {
                obj.httpStatusCode = httpStatusCode.NOT_FOUND;
                throw new Error("User not found");
            }
            obj.data = data;
            obj.httpStatusCode = httpStatusCode.OK;
            this.createResponse.successRes(res, obj);
        } catch (error) {
            logger.error(`onCreateUser ${error}`);
            next(error);
        }
    }

    async onCreateUser(req: IBaseRequest, res: Response, next: NextFunction) {
        let obj = new ResponseMessage();
        try {
            const { firstName, lastName, type, password, email } = req.body;
            const { error, value } = validateUser({ firstName, lastName, type, password, email });
            if (error) {
                obj.httpStatusCode = httpStatusCode.BAD_REQUEST;
                throw new Error("Bad Request");
            }
            const data = await this.userService.saveUserService(value);
            obj.data = data;
            obj.httpStatusCode = httpStatusCode.CREATED;
            this.createResponse.successRes(res, obj);
        } catch (error: any) {
            logger.error(`onCreateUser ${error}`);
            next(error);
        }
    }

    async onDeleteUserById(req: IBaseRequest, res: Response, next: NextFunction) {
        let obj = new ResponseMessage();
        try {
            const id: string | undefined = req?.params?.id;
            const data = await this.userService.deleteUserById(id);
            obj.data = data;
            obj.httpStatusCode = httpStatusCode.OK;
            this.createResponse.successRes(res, obj);
        } catch (error) {
            logger.error(`onDeleteUserById ${error}`);
            next(error);
        }
    }
    async onLogin(req: IBaseRequest, res: Response, next: NextFunction) {
        let obj = new ResponseMessage();
        try {
            const data = await this.userService.onLoginService(req, res);
            obj.data = data;
            obj.httpStatusCode = httpStatusCode.CREATED;
            this.createResponse.successRes(res, obj);
        } catch (error) {
            logger.error(`onCreateUser ${error}`);
            next(error);
        }
    }

    async onLogout(req: IBaseRequest, res: Response, next: NextFunction) {
        let obj = new ResponseMessage();
        try {
            await this.userService.onLogoutService(req, res);
            this.createResponse.successRes(res, obj);
        } catch (error) {
            logger.error(`onCreateUser ${error}`);
            next(error);
        }
    }
}

