import { IResponseObject } from "./utilTypes";

export class ResponseMessage implements IResponseObject {

    httpStatusCode: number;
    success: boolean;
    message: string;
    data: any;

    constructor(_httpStatusCode?: number, _success?: boolean, _message?: string, _data?: any) {
        this.httpStatusCode = _httpStatusCode || null;
        this.success = _success || null;
        this.message = _message || "";
        this.data = _data || {};
    }
}
