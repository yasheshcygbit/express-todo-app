import { Request, Response, NextFunction } from 'express';

const corsFunction = function (req: Request, res: Response, next: NextFunction) {
  res.header('Access-Control-Allow-Origin', '*');

  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,PATCH,OPTIONS,DELETE',
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, authorization',
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
};

export default corsFunction;