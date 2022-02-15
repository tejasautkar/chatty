import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IBaseRequest } from '../utils/utilTypes';

export const decode = (req: IBaseRequest, res: Response, next: NextFunction) => {}

export const encode = async (req: IBaseRequest, res: Response, next: NextFunction) => {}
export const authorize = async (req: IBaseRequest, res: Response, next: NextFunction) => {}