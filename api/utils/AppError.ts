import { httpStatusCode } from "./utilTypes";

export class AppError extends Error {
    message: string;
    statusCode: number;
    constructor(message: string, statusCode?: number) {
        super(message);
        this.message = message;
        this.statusCode = statusCode || httpStatusCode.INTERNAL_SERVER_ERROR;
    }
}