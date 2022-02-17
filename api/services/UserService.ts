import { IUser } from "../models/interfaces/IUser";
import { findOneWithFilter, saveUserRepo } from "../repository/UserRepository";
import { logger } from "../utils/Logger";

export const saveUserService = async (userObj: IUser): Promise<IUser> => {
    try {
        return await saveUserRepo(userObj);
    } catch (error) {
        logger.error(`Error in saveUserService ${error}`);
        throw error;
    }
}
export const findOneByIdService = async (_id: string | undefined): Promise<IUser | null> => {
    try {
        if (!_id) {
            throw new Error("Bad Rquest");
        }
        return await findOneWithFilter({ _id });
    } catch (error) {
        logger.error(`Error in findOneByIdService ${error}`);
        throw error;
    }
}