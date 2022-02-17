import { IUser } from "../models/interfaces/IUser";
import User from "../models/User";
import { logger } from "../utils/Logger";
import { FilterQuery } from "mongoose";
export const saveUserRepo = async (userObj: IUser): Promise<IUser> => {
    try {
        return await new User(userObj).save();
    } catch (error) {
        logger.error(`Error in [UserRepository] [saveUser] ${error}`);
        throw error;
    }
}
export const findOneWithFilter = async (userObj: FilterQuery<IUser> | undefined): Promise<IUser| null>  => {
    try {
        return User.findOne(userObj);
    } catch (error) {
        logger.error(`Error in [UserRepository] [findOneWithFilter] ${error}`);
        throw error;
    }
}