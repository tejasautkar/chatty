import { NextFunction, Response } from "express";
import { IBaseRequest } from "../utils/utilTypes";
import { validateUser } from '../models/User';
import { findOneByIdService, saveUserService } from "../services/UserService";
import { logger } from "../utils/Logger";


export const onGetAllUsers = async (req: IBaseRequest, res: Response, next: NextFunction) => { };
export const onGetUserById = async (req: IBaseRequest, res: Response) => { 
    try {
        const id: string | undefined = req?.params?.id;
        const data = await findOneByIdService(id);
        if(!data){
            throw new Error("User not found");
        }
        res.status(200).json({success: true, data}).send();

    } catch (error) {
        logger.error(`onCreateUser ${error}`);
        res.status(500).json({success: false, error}).send();
    }
};
export const onCreateUser = async (req: IBaseRequest, res: Response) => {
    try {
        const { firstName, lastName, type } = req.body;
        const { error, value } = validateUser({ firstName, lastName, type });
        if (error) {
            throw new Error("Bad Request");
        }
        if (value) {
            const data = await saveUserService(value);
            res.status(200).json({success: true, data}).send();
        }
    } catch (error) {
        logger.error(`onCreateUser ${error}`);
        res.status(500).json({success: false, error}).send();
    }
};
export const onDeleteUserById = async (req: IBaseRequest, res: Response, next: NextFunction) => { };
export const onLogin = async (req: IBaseRequest, res: Response, next: NextFunction) => { };
export const onLogout = async (req: IBaseRequest, res: Response, next: NextFunction) => { };
