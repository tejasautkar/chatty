import { FilterQuery } from "mongoose";
import { ISessions } from "../models/interfaces/ISessions";
import { ISessionRepo } from "../repository/interfaces/ISessionRepo";
import { SessionRepo } from "../repository/SessionRepository";
import { logger } from "../utils/Logger";
import { ISessionService } from "./interfaces/ISessionService";

export class SessionService implements ISessionService {
    private readonly sessionRepo: ISessionRepo = new SessionRepo();

    async saveSession(sessionObj: ISessions): Promise<ISessions> {
        try {
            return await this.sessionRepo.saveSession(sessionObj);
        } catch (error) {
            logger.error(`Session Service [saveSession] - ${error}`);
            throw error;
        }
    }
    async destroySessionBySessionId(sessionId: string): Promise<ISessions> {
        try {
            return await this.sessionRepo.updateSession({sessionId},{isLoggedIn: false});
        } catch (error) {
            logger.error(`Session Service [updateSession] - ${error}`);
            throw error;
        }
    }
    async findSessionsByuserId(userId: string): Promise<ISessions[]> {
        try {
            return await this.sessionRepo.findSessions({userId});
        } catch (error) {
            logger.error(`Session Service [findSessionsByuserId] - ${error}`);
            throw error;
        }
    }

}