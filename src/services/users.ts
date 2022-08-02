import { ApiResponse } from '../interfaces';
import User from '../models/users';
import bcrypt from 'bcrypt';
import { generateJWTtoken } from '../middlewares/authentication';
import customResponse from '../utils/customResponse';

export default {
  register: async (email: string, password: string): Promise<ApiResponse> => {
    // first check if user is already registered
    try {
      const userFind = await User.findOne({ email });
      console.log('userFind', userFind);
      if (userFind) {
        // send as not created
        throw 'USER_ALREADY_CREATED';
      } else {
        const result = await User.create({ email, password });
        if (result) {
          return customResponse('SUCCESS', 'Account created successfully', result);
        } else {
          throw 'USER_CREATION_ERROR';
        }
      }
    } catch (error) {
      console.log('error', error);
      return customResponse('ERROR', 'Account already exists', error);
    }
  },
  login: async (email: string, password: string): Promise<ApiResponse> => {
    // first check if user is already registered
    try {
      const userInfo = await User.findOne({ email });
      if (userInfo) {
        if (bcrypt.compareSync(password, userInfo.password)) {
          const token = await generateJWTtoken({ id: userInfo._id }, (60*60*24*365));
          return customResponse('SUCCESS', 'User found successfully', { user: userInfo, token: token });
        } else {
          throw 'PASSWORD_NOT_VALID';
        }
      } else {
        throw 'NO_USER'
      }
    } catch (error) {
      return customResponse('ERROR', 'Account login failed', error);
    }
  },
}