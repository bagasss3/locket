import { NextFunction, Request, Response } from 'express';
import { PassportStatic } from 'passport';
import { Res } from '../helper/response';
import { ERROR, ROLE } from '../helper/constant';

export class AuthMiddleware {
  passport: PassportStatic;
  constructor(passport: PassportStatic) {
    this.passport = passport;
    this.userAuth = this.userAuth.bind(this);
    this.adminAuth = this.adminAuth.bind(this);
    this.eventOrganizerAuth = this.eventOrganizerAuth.bind(this);
    this.apiAuth = this.apiAuth.bind(this);
  }

  userAuth(req: Request, res: Response, next: NextFunction) {
    this.passport.authenticate('jwt', { session: false }, (err, user) => {
      if (err) {
        return Res.error(res, err);
      }
      if (!user) {
        return Res.error(res, ERROR.LoginRequired);
      }

      req.user = user;
      return next();
    })(req, res, next);
  }

  adminAuth(req: Request, res: Response, next: NextFunction) {
    const user = req.user;
    if (!user) {
      return Res.error(res, ERROR.LoginRequired);
    }
    if (user.role_id !== ROLE.ADMIN) {
      return Res.error(res, ERROR.ResourceNotAllowed);
    }
    return next();
  }

  eventOrganizerAuth(req: Request, res: Response, next: NextFunction) {
    const user = req.user;

    if (!user) {
      return Res.error(res, ERROR.LoginRequired);
    }
    if (user.role_id !== ROLE.EVENT_ORGANIZER) {
      return Res.error(res, ERROR.ResourceNotAllowed);
    }
    return next();
  }

  apiAuth(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'];
    if (apiKey !== process.env.API_KEY) {
      return res.status(403).json({
        success: false,
        message: 'Not allowed to access this resource',
      });
    }
    return next();
  }
}
