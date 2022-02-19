import { NextFunction, Response } from "express";
import { IBaseRequest } from "../utils/utilTypes";
import { validateUser } from '../models/User';
import { logger } from "../utils/Logger";
import { UserService } from "../services/UserService";
import { IUserService } from "../services/interfaces/IUserService";

export class UserController {

    private readonly userService: IUserService = new UserService();

    async onGetAllUsers(req: IBaseRequest, res: Response) {
        try {

            const data = await this.userService.findAllUsersService();
            res.status(200).json({ success: true, data }).send();

        } catch (error) {
            logger.error(`UserController findAllUsers - ${error}`);
            res.status(500).json({ success: false, error });
        }
    };
    async onGetUserById(req: IBaseRequest, res: Response) {
        try {
            const id: string | undefined = req?.params?.id;
            const data = await this.userService.findOneByIdService(id);
            if (!data) {
                throw new Error("User not found");
            }
            res.status(200).json({ success: true, data }).send();

        } catch (error) {
            logger.error(`onCreateUser ${error}`);
            res.status(500).json({ success: false, error }).send();
        }
    }
    async onCreateUser(req: IBaseRequest, res: Response) {
        try {
            const { firstName, lastName, type, password, email } = req.body;
            const { error, value } = validateUser({ firstName, lastName, type, password, email });
            if (error) {
                throw new Error("Bad Request");
            }
            if (value) {
                const data = await this.userService.saveUserService(value);
                res.status(200).json({ success: true, data }).send();
            }
        } catch (error) {
            logger.error(`onCreateUser ${error}`);
            res.status(500).json({ success: false, error }).send();
        }
    }

    async onDeleteUserById(req: IBaseRequest, res: Response) {
        try {
            const id: string | undefined = req?.params?.id;
            const data = await this.userService.deleteUserById(id);
            res.status(200).json({ success: true, data }).send();

        } catch (error) {
            logger.error(`onDeleteUserById ${error}`);
            res.status(500).json({ success: false, error }).send();
        }
    }
    async onLogin(req: IBaseRequest, res: Response) {
        try {
            const data = await this.userService.onLoginService(req, res);
            if (!data) {
                throw new Error("User not found");
            }
            res.status(200).json({ success: true, data }).send();

        } catch (error) {
            logger.error(`onCreateUser ${error}`);
            res.status(500).json({ success: false, error }).send();
        }
    };
    async onLogout(req: IBaseRequest, res: Response) { };
}

