import { Response } from "express";
import { logger } from "./Logger";
import { httpStatusCode, IResponseObject, messages } from "./utilTypes";
export class CreateResponse {
    
    successRes(res: Response, resMessage: IResponseObject) {
        try {
            if (!resMessage.httpStatusCode) {
                resMessage.httpStatusCode = httpStatusCode.OK;
            }
            res.status(resMessage.httpStatusCode).send({
                httpStatusCode: resMessage.httpStatusCode,
                message: resMessage.message,
                data: resMessage.data,
                success: true
            });
        } catch (error) {
            logger.error(`Error SuccesRes: ${error}`);
            throw error;
        }
    }

    errorRes(res: Response, resMessage: IResponseObject) {
        try {
            if (!resMessage.httpStatusCode) {
                resMessage.httpStatusCode = httpStatusCode.INTERNAL_SERVER_ERROR;
            }
            if (!resMessage.message) {
                resMessage.message = messages.INTERNAL_SERVER_ERROR;
            }
            res.status(resMessage.httpStatusCode).json({
                httpStatusCode: resMessage.httpStatusCode,
                message: resMessage.message,
                data: resMessage.data,
                success: false
            }).send();
        } catch (error) {
            logger.error(`Error SuccesRes: ${error}`);
            throw error;
        }
    }
}

abstract class BaseController {
    httpStatusCode: number;
    message: string;
    data: any;
    success: boolean;
    createResponse: CreateResponse;
}

BaseController.prototype.createResponse = new CreateResponse();

export default BaseController;

