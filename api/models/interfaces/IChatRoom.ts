import { IUser } from "./IUser";

export interface IChatRoom {
    _id: string;
    userIds: IUser["_id"][];
    type: CHAT_ROOM_TYPES;
    chatInitiator: IUser["_id"]
}

export enum CHAT_ROOM_TYPES {
    CONSUMER_TO_CONSUMER = "consumer-to-consumer",
    CONSUMER_TO_SUPPORT = "consumer-to-support",
  };