import { Request, Response } from 'express';

export class UserController {
  constructor() {
    this.profile = this.profile.bind(this);
  }

  profile(req: Request, res: Response) {
    return res.send('Ini dari controller user');
  }
}
