import { ISessions } from "../../models/interfaces/ISessions";
import { FilterQuery } from "mongoose";

export interface ISessionRepo {
    saveSession(sessionObj: ISessions): Promise<ISessions>;
    updateSession(sessionObj: FilterQuery<ISessions>, setProps: Partial<ISessions>): Promise<ISessions>;
    findSessions(sessionObj: FilterQuery<ISessions>): Promise<ISessions[]>
}