import { NextFunction, Response } from "express";
import { IBaseRequest } from "../utils/utilTypes";


export const onGetAllUsers = async (req: IBaseRequest, res: Response, next: NextFunction) => { };
export const onGetUserById = async (req: IBaseRequest, res: Response, next: NextFunction) => { };
export const onCreateUser = async (req: IBaseRequest, res: Response, next: NextFunction) => { };
export const onDeleteUserById = async (req: IBaseRequest, res: Response, next: NextFunction) => { };
export const onLogin = async (req: IBaseRequest, res: Response, next: NextFunction) => { };
export const onLogout = async (req: IBaseRequest, res: Response, next: NextFunction) => { };
