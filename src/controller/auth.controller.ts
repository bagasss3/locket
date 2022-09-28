import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { UserRepository } from '../repository/user.repository';
import { SessionRepository } from '../repository/session.repository';
import { EventOrganizerRepository } from '../repository/event_organizer.repository';
import { valLogin } from '../helper/validation';
import { Res } from '../helper/response';
import { ERROR, SUCCESS, ROLE } from '../helper/constant';
import { createToken } from '../helper/token';
import { expiredDate, generateID } from '../helper/vegenerate';

export class AuthController {
  userRepository: UserRepository;
  sessionRepository: SessionRepository;
  eventOrganizerRepository: EventOrganizerRepository;
  constructor(
    userRepository: UserRepository,
    sessionRepository: SessionRepository,
    eventOrganizerRepository: EventOrganizerRepository,
  ) {
    this.userRepository = userRepository;
    this.sessionRepository = sessionRepository;
    this.eventOrganizerRepository = eventOrganizerRepository;
    this.login = this.login.bind(this);
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = valLogin.validate(req.body);
      if (result.error) {
        return Res.error(res, result.error.details[0].message);
      }

      const findUser = await this.userRepository.find({
        where: {
          email,
        },
      });
      if (!findUser) {
        return Res.error(res, ERROR.WrongEmailorPassword);
      }

      // Check IF user is EO and is not VERIFIED
      if (findUser.role_id === ROLE.EVENT_ORGANIZER) {
        const checkEO = await this.eventOrganizerRepository.find({
          where: {
            user_id: findUser.id,
          },
        });
        if (!checkEO) {
          return Res.error(res, ERROR.WrongEmailorPassword);
        }
        if (!checkEO.is_verified) {
          return Res.error(res, ERROR.EONotVerified);
        }
      }

      const comparePassword = await bcrypt.compare(password, findUser.password);
      if (!comparePassword) {
        return Res.error(res, ERROR.WrongEmailorPassword);
      }

      const payload = {
        email: findUser.email,
        role_id: findUser.role_id,
      };

      const accessToken = createToken(
        payload,
        <jwt.Secret>process.env.VERIFY_KEY,
        <string | number>process.env.ACCESS_TOKEN_EXPIRES,
      );
      const refreshToken = createToken(
        payload,
        <jwt.Secret>process.env.VERIFY_KEY_REFRESH,
        <string | number>process.env.REFRESH_TOKEN_EXPIRES,
      );

      const expDate = expiredDate(4320);
      const newSession = await this.sessionRepository.store({
        data: {
          id: generateID(),
          access_token: accessToken,
          refresh_token: refreshToken,
          refresh_token_expired_at: expDate,
          user_id: findUser.id,
        },
      });

      if (!newSession) {
        return Res.error(res, ERROR.InternalServer);
      }
      return Res.success(res, SUCCESS.Login, {
        access_token: accessToken,
        refresh_token: refreshToken,
      });
    } catch (err) {
      return Res.error(res, err);
    }
  }
}
