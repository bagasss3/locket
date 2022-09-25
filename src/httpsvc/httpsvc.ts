import { Application, Router } from 'express';
import { UserController } from '../controller/user.controller';
export class Service {
  app: Application;
  userController: UserController;
  constructor(app: Application, userController: UserController) {
    this.app = app;
    this.userController = userController;
  }
  init() {
    this.api();
  }

  api() {
    this.app.get('/', this.userController.test);
  }

  web() {}
}
