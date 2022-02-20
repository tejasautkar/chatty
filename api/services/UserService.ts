import { IUser } from "../models/interfaces/IUser";
import { logger } from "../utils/Logger";
import { httpStatusCode, IBaseRequest, IDeleteDocument } from "../utils/utilTypes";
import { isEmpty, omit, pick } from "lodash";
import { compare, genSalt, hashSync } from "bcrypt"
import { config } from "../utils/config";
import { IUserService } from "./interfaces/IUserService";
import { SessionService } from "./SessionService";
import { sign } from "jsonwebtoken";
import { Response } from "express"
import { ISessionService } from "./interfaces/ISessionService";
import { IUserRepository } from "../repository/interfaces/IUserRepository";
import { UserRepository } from "../repository/UserRepository";
import { AppError } from "../utils/AppError";

export class UserService implements IUserService {
    private sessionService: ISessionService;
    private userRepo: IUserRepository;
    constructor() {
        this.sessionService = new SessionService();
        this.userRepo = new UserRepository();
    }
    async saveUserService(userObj: IUser): Promise<Partial<IUser>> {
        try {
            const user = await this.findOneByEmail(userObj.email);
            if (!isEmpty(user)) {
                throw new AppError("User already exist", httpStatusCode.CONFLICT)
            }
            const salt = await genSalt();
            userObj.password = hashSync(userObj.password, salt);
            await this.userRepo.saveUserRepo(userObj);
            return { email: userObj.email }
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
            return await this.userRepo.findOneWithFilter({ _id });
        } catch (error) {
            logger.error(`Error in findOneByIdService ${error}`);
            throw error;
        }
    }
    async findAllUsersService(): Promise<IUser[]> {
        try {
            return await this.userRepo.findManyWithFilter({});
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
            return await this.userRepo.deleteById(_id);
        } catch (error) {
            logger.error(`Error in findOneByIdService ${error}`);
            throw error;
        }
    }

    async onLoginService(req: IBaseRequest, res: Response): Promise<Partial<IUser>> {
        try {
            const { email, password }: { email: string, password: string } = req?.body;

            const user = await this.userRepo.findOneWithFilter({ email });

            if (isEmpty(user)) {
                throw new Error("User not found");
            }
            const isPasswordValid = await compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error("Invalid Password");
            }

            const session = await this.sessionService.saveSession({
                userId: user._id,
                ip: req.ip ?? "",
                isLoggedIn: true
            });
            const token = sign({ email, firstName: user.firstName, sessionId: session._id }, config.jwtSalt, {
                expiresIn: config.jwtExpire
            });
            res.cookie("Authorization", `Bearer ${token}`, {
                httpOnly: true,
                maxAge: config.jwtExpire,
                secure: false
            });
            return omit(user, password);
        } catch (error) {
            logger.error(`Error in onLoginService ${error}`);
            throw error;
        }
    }
    async onLogoutService(req: IBaseRequest, res: Response): Promise<void> {
        try {
            const { email = null, sessionId } = req;
            const user = await this.userRepo.findOneWithFilter({ email });
            if (isEmpty(user)) {
                throw new Error("User not found");
            }
            res.clearCookie("Authorization");
            await this.sessionService.destroySessionBySessionId(sessionId);
        } catch (error) {
            logger.error(`Error in onLoginService ${error}`);
            throw error;
        }
    }
    async findOneByEmail(email: string): Promise<IUser> {
        try {
            return await this.userRepo.findOneWithFilter({ email });
        } catch (error) {
            logger.error(`UserServise findOneByEmail - ${error}`);
            throw error;
        }
    }
}


