import { NextFunction, Response } from 'express';
import  { verify } from 'jsonwebtoken';
import { config } from '../utils/config';
import { logger } from '../utils/Logger';
import { IBaseRequest, IJwtPayload } from '../utils/utilTypes';

export function authorization (req: IBaseRequest, res: Response, next: NextFunction) {
    let resObj = {success: false, message: "Not Authorized"};
    logger.info(`req cookies - ${JSON.stringify(req.cookies)}`);
    if (!req.cookies["Authorization"]) {
        res.status(404).send(resObj);
        return;
    }
    let bearerToken: string = "";
    const token = req.cookies["Authorization"];
    if (token?.startsWith("Bearer ")) {
        bearerToken = token?.split(" ")[1];
    }
    let decoded: IJwtPayload = undefined;
    try {
        decoded = verifyToken(bearerToken) as IJwtPayload;
    } catch (error) {
        logger.error(`Error decode - ${error}`)
        res.status(404).send({...resObj, message: error});
        return;
    }
    if (decoded) {
        req.email = decoded.email;
        req.firstName = decoded.firstName;
        req.sessionId = decoded.sessionId;
        next();
    }
    
}

export const verifyToken = (token: string) => {

    logger.info(`token -> ${token} - salt ${config.jwtSalt}`);
    return verify(token, config.jwtSalt);
}

