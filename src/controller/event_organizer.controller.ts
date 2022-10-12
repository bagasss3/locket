import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { TokenRepository } from '../repository/token.repository';
import { UserRepository } from '../repository/user.repository';
import { valRegisEventOrganizer } from '../helper/validation';
import { Res } from '../helper/response';
import { ERROR, SUCCESS } from '../helper/constant';
import { createToken } from '../helper/token';
import { generateID, expiredDate } from '../helper/vegenerate';
import { sendMail } from '../service/mail';
import { ImageRepository } from 'src/repository/image.repository';
import { EventOrganizerPreconditionRepository } from 'src/repository/event_organizer_precondition.repository';
import { EventOrganizerRepository } from 'src/repository/event_organizer.repository';

export class EventOrganizerController {
  userRepository: UserRepository;
  tokenRepository: TokenRepository;
  imageRepository: ImageRepository;
  eventOrganizerRepository: EventOrganizerRepository;
  eventOrganizerPreconditionRepository: EventOrganizerPreconditionRepository;
  constructor(
    userRepository: UserRepository,
    tokenRepository: TokenRepository,
    imageRepository: ImageRepository,
    eventOrganizerRepository: EventOrganizerRepository,
    eventOrganizerPreconditionRepository: EventOrganizerPreconditionRepository,
  ) {
    this.userRepository = userRepository;
    this.tokenRepository = tokenRepository;
    this.imageRepository = imageRepository;
    this.eventOrganizerRepository = eventOrganizerRepository;
    this.eventOrganizerPreconditionRepository =
      eventOrganizerPreconditionRepository;
    this.register = this.register.bind(this);
    this.createPrecondition = this.createPrecondition.bind(this);
    this.findAllVerifiedEO = this.findAllVerifiedEO.bind(this);
  }

  async register(req: Request, res: Response) {
    try {
      const { email, name, password, repassword } = req.body;

      const validate = valRegisEventOrganizer.validate(req.body);
      if (validate.error) {
        return Res.error(res, validate.error.details[0].message);
      }

      if (password != repassword) {
        return Res.error(res, ERROR.PasswordNotMatch);
      }

      const findEmailUser = await this.userRepository.find({
        where: {
          email: email,
        },
      });
      if (findEmailUser) {
        return Res.error(res, ERROR.EmailRegistered);
      }

      const hashPassword = await bcrypt.hash(
        password,
        Number(process.env.SALT),
      );

      const token = createToken(
        {
          email,
          name,
          password: hashPassword,
        },
        <jwt.Secret>process.env.VERIFY_KEY,
        <string | number>process.env.ACCESS_TOKEN_EXPIRES,
      );
      const ID: number = generateID();
      const ExpDate = expiredDate(30);

      const newToken = await this.tokenRepository.store({
        data: {
          id: ID,
          email: email,
          token: token,
          expired_at: ExpDate,
        },
      });
      if (!newToken) {
        return Res.error(res, ERROR.InternalServer);
      }

      if (process.env.SEND_MAIL) {
        const subjectEmail = 'Register Event Organizer';
        const message = `
        <h1>Registrasi berhasil!</h1>
        <p>Silahkan melakukan verifikasi melalui link berikut:</p>
        <p style="font-size: 24px;">Link verification: <strong>${process.env.LINK_VERIFICATION}${newToken.token}</strong></p>
    `;

        switch (process.env.NODE_ENV) {
          case 'development':
            await sendMail(
              <string>process.env.TEST_EMAIL,
              subjectEmail,
              message,
            );
            break;
          default:
            await sendMail(email, subjectEmail, message);
        }
      }
      return Res.success(res, SUCCESS.Register, newToken);
    } catch (err) {
      return Res.error(res, err);
    }
  }

  async createPrecondition(req: Request, res: Response) {
    try {
      const { user } = req;
      const { image_id } = req.body;
      if (!user) {
        return Res.error(res, ERROR.UserNotFound);
      }

      const findEO = await this.eventOrganizerRepository.find({
        where: {
          user_id: user.id,
        },
      });
      if (!findEO) {
        return Res.error(res, ERROR.UserNotFound);
      }

      const checkPrecondition =
        await this.eventOrganizerPreconditionRepository.find({
          where: {
            event_organizer_id: findEO.id,
          },
        });
      if (checkPrecondition) {
        return Res.error(res, ERROR.AlreadyHaPrecondition);
      }
      const findImage = await this.imageRepository.find({
        where: {
          id: Number(image_id),
        },
      });
      if (!findImage) {
        return Res.error(res, ERROR.ImageNotFound);
      }

      const createEOPrecondition =
        await this.eventOrganizerPreconditionRepository.store({
          data: {
            id: generateID(),
            event_organizer_id: findEO.id,
            image_id: Number(image_id),
          },
        });
      if (!createEOPrecondition) {
        return Res.error(res, ERROR.InternalServer);
      }
      return Res.success(
        res,
        SUCCESS.CreateEOPrecondition,
        createEOPrecondition,
      );
    } catch (err) {
      return Res.error(res, err);
    }
  }

  async findAllVerifiedEO(req: Request, res: Response) {
    try {
      const findAllEO =
        await this.eventOrganizerRepository.findAllWithCondition({
          where: {
            is_verified: true,
          },
        });
      return Res.success(res, SUCCESS.GetAllEO, findAllEO);
    } catch (err) {
      return Res.error(res, err);
    }
  }
}
