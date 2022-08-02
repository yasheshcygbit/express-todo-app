import { Schema, Document, model } from 'mongoose';
const bcrypt = require('bcrypt');
const saltRounds = 10;

export interface User {
  email: string,
  password: string,
}

interface UserModel extends User, Document {}

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

UserSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
})

export default model<UserModel>('users', UserSchema);