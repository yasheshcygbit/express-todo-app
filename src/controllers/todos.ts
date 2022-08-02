import { NextFunction, Request, Response } from "express";
import ToDo from '../models/todos';
import ToDoService from '../services/todos';

interface CreateBody {
  title: string;
};

interface UpdateBody {
  _id: string;
  isComplete: boolean
};

export default {
  addToDo: async(req: Request, res: Response, next: NextFunction) => {
    const { title } = <CreateBody>req.body;
    const result = await ToDoService.addToDo(title);
    if (result.status === 'SUCCESS') {
      res.status(200).send(result);
    } else {
      res.status(500).send(result);
    }
  },
  updateToDo: async(req: Request, res: Response, next: NextFunction) => {
    const { _id, isComplete } = <UpdateBody>req.body;
    const result = await ToDoService.updateToDo(_id, isComplete);
    if (result.status === 'SUCCESS') {
      res.status(200).send(result);
    } else {
      res.status(500).send(result);
    }
  }
}