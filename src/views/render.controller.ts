import { Request, Response } from 'express';

export class RenderController {
  constructor() {
    this.home = this.home.bind(this);
  }

  async home(req: Request, res: Response) {
    return res.render('base', {
      layout: 'layout/base-layout',
    });
  }
}
