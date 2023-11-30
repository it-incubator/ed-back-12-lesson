import express, { json, NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const asyncHandler =
  (callback: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: any, res: any, next: any) => {
    Promise.resolve(callback(req, res, next)).catch(next);
  };

const delay = (ms: number) => {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      reject(new Error('delay error'));
    }, ms)
  );
};

export const app = express();
app.use(cookieParser());

app.set('trust proxy', true);

app.use(cors());
app.use(json());

export const port = process.env.PORT || 5005;

app.get(
  '/',
  asyncHandler(async (req, res, next) => {
    res.send('ok');
  })
);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    console.log(error.message);
    res.send(error.message);
  }
  next();
});
