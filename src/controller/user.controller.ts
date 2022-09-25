import { Request, Response } from 'express';

export class UserController {
  constructor() {
    this.test = this.test.bind(this);
  }

  test(req: Request, res: Response) {
    return res.send('Ini dari controller user');
  }
}
