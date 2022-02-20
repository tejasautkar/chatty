import {  NextFunction, Request, Response } from "express"
import { CreateResponse } from "../utils/BaseContoller";
import { logger } from "../utils/Logger"
import { httpStatusCode, messages } from "../utils/utilTypes";

export const exceptionHandler = (err: any, _req: Request, res: Response, _next: NextFunction)  => {
    if (err) {
        logger.error(`Error stack - ${err.stack}`);
        const resp = new CreateResponse();
        resp.errorRes(res, {
            httpStatusCode: err.statusCode || httpStatusCode.INTERNAL_SERVER_ERROR,
            message: err.message || messages.INTERNAL_SERVER_ERROR,
            data: null,
            success: false
        })
    }
}