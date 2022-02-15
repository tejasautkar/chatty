import { NextFunction, Response } from "express";
import { IBaseRequest } from "../utils/utilTypes";

    export const getRecentConversation = async (req: IBaseRequest, res: Response, next: NextFunction) => { }
    export const getConversationByRoomId = async (req: IBaseRequest, res: Response, next: NextFunction) => { }
    export const initiate = async (req: IBaseRequest, res: Response, next: NextFunction) => { }
    export const postMessage = async (req: IBaseRequest, res: Response, next: NextFunction) => { }
    export const markConversationReadByRoomId = async (req: IBaseRequest, res: Response, next: NextFunction) => { }
