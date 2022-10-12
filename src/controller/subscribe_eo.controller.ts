import { Request, Response } from 'express';
import { ParticipantRepository } from 'src/repository/participant.repository';
import { SubscribeEORepository } from 'src/repository/subscribe_eo.repository';
import { EventOrganizerRepository } from 'src/repository/event_organizer.repository';
import { Res } from '../helper/response';
import { ERROR, SUCCESS } from '../helper/constant';
import { generateID } from 'src/helper/vegenerate';

export class SubscribeEOController {
  participantRepository: ParticipantRepository;
  eventOrganizerRepository: EventOrganizerRepository;
  subscribeEORepository: SubscribeEORepository;
  constructor(
    participantRepository: ParticipantRepository,
    eventOrganizerRepository: EventOrganizerRepository,
    subscribeEORepository: SubscribeEORepository,
  ) {
    this.participantRepository = participantRepository;
    this.eventOrganizerRepository = eventOrganizerRepository;
    this.subscribeEORepository = subscribeEORepository;
    this.subscribeEO = this.subscribeEO.bind(this);
  }

  async subscribeEO(req: Request, res: Response) {
    try {
      const { event_organizer_id } = req.body;
      const findParticipant = await this.participantRepository.find({
        where: {
          user_id: req.user?.id,
        },
      });
      if (!findParticipant) {
        return Res.error(res, ERROR.UserNotParticipant);
      }

      const findEO = await this.eventOrganizerRepository.find({
        where: {
          id: Number(event_organizer_id),
        },
      });
      if (!findEO) {
        return Res.error(res, ERROR.UserNotFound);
      }
      if (!findEO.is_verified) {
        return Res.error(res, ERROR.EONotVerified);
      }

      const isSubscribe = await this.subscribeEORepository.find({
        where: {
          participant_id: findParticipant.id,
          event_organizer_id: findEO.id,
        },
      });
      if (isSubscribe) {
        return Res.error(res, ERROR.AlreadySubscribe);
      }

      const doSubscribe = await this.subscribeEORepository.store({
        data: {
          id: generateID(),
          participant_id: findParticipant.id,
          event_organizer_id: findEO.id,
        },
      });
      if (!doSubscribe) {
        return Res.error(res, ERROR.InternalServer);
      }

      return Res.success(res, SUCCESS.Subscribed, doSubscribe);
    } catch (err) {
      console.log(err);
      return Res.error(res, err);
    }
  }
}
