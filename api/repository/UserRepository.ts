import { IUser } from "../models/interfaces/IUser";
import User from "../models/User";
import { logger } from "../utils/Logger";
import { FilterQuery } from "mongoose";
import { IDeleteDocument } from "../utils/utilTypes";
export const saveUserRepo = async (userObj: IUser): Promise<IUser> => {
    try {
        return await new User(userObj).save();
    } catch (error) {
        logger.error(`Error in [UserRepository] [saveUser] ${error}`);
        throw error;
    }
}
export const findOneWithFilter = async (userObj: FilterQuery<IUser> | undefined): Promise<IUser> => {
    try {
        return User.findOne(userObj).lean();
    } catch (error) {
        logger.error(`Error in [UserRepository] [findOneWithFilter] ${error}`);
        throw error;
    }
}

export const findManyWithFilter = async (userObj: FilterQuery<IUser>): Promise<IUser[]> => {
    try {
        return User.find(userObj).lean();
    } catch (error) {
        logger.error(`Error in [UserRepository] [findManyWithFilter] ${error}`);
        throw error;
    }
}

export const deleteById = async (_id: string): Promise<IDeleteDocument> => {
    try {
        return User.deleteOne({_id});
    } catch (error) {
        logger.error(`Error in [UserRepository] [findManyWithFilter] ${error}`);
        throw error;
    }
}