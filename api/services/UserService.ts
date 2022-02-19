import { IUser } from "../models/interfaces/IUser";
import { deleteById, findManyWithFilter, findOneWithFilter, saveUserRepo } from "../repository/UserRepository";
import { logger } from "../utils/Logger";
import { IBaseRequest, IDeleteDocument } from "../utils/utilTypes";
import { isEmpty, omit, pick } from "lodash";
import { compare, hashSync } from "bcrypt"
import { config } from "../utils/config";
import { IUserService } from "./interfaces/IUserService";
import { SessionService } from "./SessionService";
import { sign } from "jsonwebtoken";
import { Response } from "express"

export class UserService implements IUserService {
    private sessionService = new SessionService();

    async saveUserService(userObj: IUser): Promise<IUser> {
        try {
            userObj.password = hashSync(userObj.password, config.passwordSalt);
            return await saveUserRepo(userObj);
        } catch (error) {
            logger.error(`Error in saveUserService ${error}`);
            throw error;
        }
    }

    async findOneByIdService(_id: string | undefined): Promise<IUser> {
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
    async findAllUsersService(): Promise<IUser[]> {
        try {
            return await findManyWithFilter({});
        } catch (error) {
            logger.error(`Error in findOneByIdService ${error}`);
            throw error;
        }
    }
    async deleteUserById(_id: string | undefined): Promise<IDeleteDocument> {
        try {
            if (!_id) {
                throw new Error("Bad Request")
            }
            return await deleteById(_id);
        } catch (error) {
            logger.error(`Error in findOneByIdService ${error}`);
            throw error;
        }
    }

    async onLoginService(req: IBaseRequest, res: Response): Promise<Partial<IUser>> {
        try {
            const { email, password }: { email: string, password: string } = req?.body;

            const user = await findOneWithFilter({ email });
            if (isEmpty(user)) {
                throw new Error("User not found");
            }
            const isPasswordValid = await compare(user.password, password);
            if (!isPasswordValid) {
                throw new Error("Invalid Password");
            }
            const token = sign({ email, firstName: user.firstName }, config.passwordSalt, {
                expiresIn: config.jwtExpire
            });
            res.cookie("Authorization", `Bearer ${token}`, {
                httpOnly: true,
                maxAge: config.jwtExpire,
                secure: true
            });
            await this.sessionService.saveSession({
                userId: user._id!,
                ip: req.ip ?? "",
                isLoggedIn: true
            });
            return omit(user, password);
        } catch (error) {
            logger.error(`Error in onLoginService ${error}`);
            throw error;
        }
    }
}


