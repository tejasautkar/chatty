import {Schema, model} from "mongoose";
import { v4 as uuidv4 } from "uuid";
import Joi  from "joi";
import { IUser, USER_TYPES } from "./interfaces/IUser";


const userSchema = new Schema<IUser>(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/\-/g, ""),
    },
    firstName: String,
    lastName: String,
    type: String,
  },
  {
    timestamps: true,
    collection: "users",
  }
);

export const validateUser = (userObj: IUser )=> {
  let schema: Joi.ObjectSchema<IUser> = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    type: Joi.string().required().valid(...Object.values(USER_TYPES)),
  });
  return schema.validate(userObj);
}

export default model<IUser>("User", userSchema);