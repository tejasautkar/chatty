import { IUser } from "../../models/interfaces/IUser";
import { IDeleteDocument } from "../../utils/utilTypes";
import { FilterQuery } from "mongoose"
export interface IUserRepository {
    saveUserRepo(userObj: IUser): Promise<IUser>;
    findOneWithFilter(userObj: FilterQuery<IUser> | undefined): Promise<IUser>;
    findManyWithFilter(userObj: FilterQuery<IUser>): Promise<IUser[]>;
    deleteById(_id: string): Promise<IDeleteDocument>;
}