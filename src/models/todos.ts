import { Schema, Document, model } from 'mongoose';

export interface ToDo {
  title: string,
  isComplete: boolean
}

interface ToDoModel extends ToDo, Document {}

const ToDoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  isComplete: {
    type: Boolean
  }
});

export default model<ToDoModel>('todos', ToDoSchema);