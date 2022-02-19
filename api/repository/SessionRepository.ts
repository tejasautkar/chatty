import { ISessions } from "../models/interfaces/ISessions";
import Session from "../models/Session";
import { logger } from "../utils/Logger";
import { ISessionRepo } from "./interfaces/ISessionRepo";
import { FilterQuery } from "mongoose";
export class SessionRepo implements ISessionRepo {
    async saveSession(sessionObj: ISessions): Promise<ISessions> {
        try {
            const session = new Session(sessionObj);
            return session.save();
        } catch (error) {
            logger.error(`saveSession SessionRepo - ${error}`);
            throw error;
        }
    }
    async updateSession(sessionObj: FilterQuery<ISessions>, setProps: Partial<ISessions>): Promise<ISessions> {
        try {
            return Session.updateMany(sessionObj, setProps).lean();
        } catch (error) {
            logger.error(`saveSession SessionRepo - ${error}`);
            throw error;
        }
    }
    async findSessions(sessionObj: FilterQuery<ISessions>): Promise<ISessions[]> {
        try {
            return Session.find(sessionObj).lean();
        } catch (error) {
            logger.error(`findSessions SessionRepo - ${error}`);
            throw error;
        }
    }
    
}