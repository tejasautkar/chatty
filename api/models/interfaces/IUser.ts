export interface IUser {
    _id?: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    type: USER_TYPES
}


export enum USER_TYPES  {
    CONSUMER = "consumer",
    SUPPORT = "support",
  }