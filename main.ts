import express, { Application } from 'express';
import dotenv from 'dotenv-safe';
import { Service } from './src/httpsvc/httpsvc';
import { UserController } from './src/controller/user.controller';

dotenv.config();
const app: Application = express();
const port: Number = 3000;

const userController = new UserController();
const httpSvc = new Service(app, userController);
httpSvc.init();

app.listen(port, () => {
  console.log(
    `Connected successfully on port ${port}, Hello ${process.env.TEST}`,
  );
});
