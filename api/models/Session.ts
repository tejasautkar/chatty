import {Schema, model } from "mongoose";
import { ISessions } from "./interfaces/ISessions";
import { v4 as uuidv4 } from "uuid";
import { boolean } from "joi";

const sessionSchema = new Schema<ISessions>({
    _id: {
        type: String,
        default: () => uuidv4().replace(/\-/g, ""),
      },
    userId: String,
    ip: String,
    isLoggedIn: Boolean
});

export default model<ISessions>("sessions", sessionSchema);