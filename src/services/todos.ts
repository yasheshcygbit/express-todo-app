import { ApiResponse } from '../interfaces';
import ToDo from '../models/todos';
import customResponse from '../utils/customResponse';

export default {
  addToDo: async (title: string): Promise<ApiResponse> => {
    try {
      const responseToDoCreate = await ToDo.create({ title });
      if (responseToDoCreate) {
        return customResponse('SUCCESS', 'ToDo added successfully', responseToDoCreate);
      } else {
        throw 'TODO_CREATION_FAILED';
      }
    } catch (error) {
      return customResponse('ERROR', 'Failed to add ToDo', error);
    }
  },
  updateToDo: async (_id: string, isComplete: boolean): Promise<ApiResponse> => {
    const responseToDoCreate = await ToDo.updateOne({ _id }, { isComplete });
    try {
      const responseToDoUpdate = await ToDo.updateOne({ _id }, { isComplete });
      if (responseToDoUpdate) {
        return customResponse('SUCCESS', 'ToDo added successfully', responseToDoUpdate);
      } else {
        throw 'TODO_UPDATE_FAILED';
      }
    } catch (error) {
      return customResponse('ERROR', 'Failed to update ToDo', error);
    }
  }
}