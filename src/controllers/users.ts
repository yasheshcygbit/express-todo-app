import { NextFunction, Request, Response } from "express";

import User from '../models/users';
import UserService from '../services/users';
import customResponse from "../utils/customResponse";
const { generateJWTtoken } = require('../middlewares/authentication');

interface CreateBody {
  email: string,
  password: string
}

interface AuthenticateBody {
  email: string,
  password: string
}

export default {
  register: async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = <CreateBody>req.body;
    console.log('= = email', email);
    
    if (email && password) {
      const findRes = await UserService.findUserByEmail(email);
      if (findRes) {
        res.status(403).send(customResponse('ERROR', 'User with same email exists', 'EMAIL_ALREADY_REGISTERED'));
      } else {
        const result = await UserService.register(email, password);
        if (result.status === 'SUCCESS') {
          res.status(200).send(result);
        } else {
          res.status(500).send(result);
        }
      }
    } else {
      res.status(500).send(customResponse('ERROR', 'Failed to register user', 'INCOMPLETE_DETAILS'));
    }
  },
  login: async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = <AuthenticateBody>req.body;
    const result = await UserService.login(email, password);
    if (result.status === 'SUCCESS') {
      res.status(200).send(result);
    } else {
      res.status(500).send(result);
    }
  },
}