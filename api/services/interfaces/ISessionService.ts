import { ISessions } from "../../models/interfaces/ISessions";
import { FilterQuery } from "mongoose";
export interface ISessionService {
    saveSession(sessionObj: ISessions): Promise<ISessions>;
    destroySessionBySessionId(sessionId: string): Promise<ISessions>
    findSessionsByuserId(userId: string): Promise<ISessions[]>
}