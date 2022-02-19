import { Request } from "express";

export interface IBaseRequest extends Partial<Request> {

}

export interface IDeleteDocument {
     acknowledged: boolean;
     deletedCount: number;
}