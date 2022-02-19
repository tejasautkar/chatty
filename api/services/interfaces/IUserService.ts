import { IUser } from "../../models/interfaces/IUser";
import { IDeleteDocument, IBaseRequest } from "../../utils/utilTypes";
import { Response } from "express";

export interface IUserService {
    saveUserService(userObj: IUser): Promise<IUser>
    findOneByIdService(_id: string | undefined): Promise<IUser>
    findAllUsersService(): Promise<IUser[]>
    deleteUserById(_id: string | undefined): Promise<IDeleteDocument>
    onLoginService(req: IBaseRequest, res: Response): Promise<Partial<IUser>>
}