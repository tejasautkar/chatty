import { Request } from "express";
import { IUser } from "../models/interfaces/IUser";

export interface IBaseRequest extends Partial<Request> {
     email: IUser["email"];
     firstName: IUser["firstName"];
     sessionId: string;
}

export interface IDeleteDocument {
     acknowledged: boolean;
     deletedCount: number;
}

export interface IJwtPayload {
     email: IUser["email"];
     firstName: IUser["firstName"];
     sessionId: string;
}

export const httpStatusCode = {
     OK: 200,
     CREATED: 201,
     ACCEPTED: 202,
     NOT_FOUND: 404,
     INTERNAL_SERVER_ERROR: 500,
     BAD_REQUEST: 400,
     UNAUTHORIZED: 401,
     CONFLICT: 409
}
export const messages = {
     OK: "Success",
     CREATED: "Successsfully Created",
     ACCEPTED: "Accepted",
     RESOURCE_NOT_FOUND: "Resource Not Found",
     INTERNAL_SERVER_ERROR: "Internal Server Error",
     BAD_REQUEST: "Bad Request",
     UNAUTHORIZED: "Not Authorized to Access the Resource",
     USER_NOT_FOUND: "User Not Found",
     NOT_FOUND: "Not Found"
}

export interface IResponseObject {
     httpStatusCode: number;
     message: string;
     data: any;
     success: boolean;
}

export const socketEvents = {
     connection: "connection",
     disconnect: "disconnect",
     identity: "identity",
     subscribe: "subscribe",
     unsubscribe: "unsubscribe"
}