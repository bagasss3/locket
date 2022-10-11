import { Request, Response } from 'express';
import { EventCommentRepository } from 'src/repository/event_comment.repository';
import { EventRepository } from 'src/repository/event.repository';
import { UserRepository } from 'src/repository/user.repository';
import { Res } from '../helper/response';
import { ERROR, SUCCESS } from '../helper/constant';
import { valCreateComment } from '../helper/validation';
import { generateID } from '../helper/vegenerate';

export class EventCommentController {
  eventCommentRepository: EventCommentRepository;
  eventRepository: EventRepository;
  userRepository: UserRepository;
  constructor(
    eventCommentRepository: EventCommentRepository,
    eventRepository: EventRepository,
    userRepository: UserRepository,
  ) {
    this.eventCommentRepository = eventCommentRepository;
    this.eventRepository = eventRepository;
    this.userRepository = userRepository;
    this.create = this.create.bind(this);
    this.findAllParentCommentsByEventID =
      this.findAllParentCommentsByEventID.bind(this);
  }

  async create(req: Request, res: Response) {
    try {
      const { comment, event_id, parent_id, mentioned_user } = req.body;
      const validate = valCreateComment.validate(req.body);
      if (validate.error) {
        return Res.error(res, validate.error.details[0].message);
      }

      const findEvent = await this.eventRepository.find({
        where: {
          id: event_id,
        },
      });
      if (!findEvent) {
        return Res.error(res, ERROR.EventDoesNotExist);
      }

      if (!findEvent.is_verified) {
        return Res.error(res, ERROR.EventNotVerified);
      }

      if (parent_id) {
        const findParentComment = await this.eventCommentRepository.find({
          where: {
            id: parent_id,
          },
        });
        if (!findParentComment) {
          return Res.error(res, ERROR.NotFound);
        }
      }

      if (mentioned_user) {
        const findUser = await this.userRepository.find({
          where: {
            id: mentioned_user,
          },
        });
        if (!findUser) {
          return Res.error(res, ERROR.UserNotFound);
        }
      }

      const createComment = await this.eventCommentRepository.store({
        data: {
          id: generateID(),
          user_id: req.user?.id,
          event_id: findEvent.id,
          comment,
          parent_id,
          mentioned_user,
        },
      });
      if (!createComment) {
        return Res.error(res, ERROR.InternalServer);
      }

      return Res.success(res, SUCCESS.CreateComment, createComment);
    } catch (err) {
      return Res.error(res, err);
    }
  }

  async findAllParentCommentsByEventID(req: Request, res: Response) {
    try {
      const { event_id } = req.params;
      const findEvent = await this.eventRepository.find({
        where: {
          id: Number(event_id),
        },
      });
      if (!findEvent) {
        return Res.error(res, ERROR.EventDoesNotExist);
      }

      const findParentComments =
        await this.eventCommentRepository.findAllWithCondition({
          where: {
            event_id: findEvent.id,
            parent_id: null,
          },
        });
      return Res.success(res, SUCCESS.GetAllComment, findParentComments);
    } catch (err) {
      return Res.error(res, err);
    }
  }
}
