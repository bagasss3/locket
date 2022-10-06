import { PrismaClient } from '@prisma/client';
import { EventRepository } from 'src/repository/event.repository';
import { ParticipantRepository } from 'src/repository/participant.repository';
import { UserRepository } from 'src/repository/user.repository';
import { EventOrganizerRepository } from 'src/repository/event_organizer.repository';
import { Request, Response } from 'express';
import { Res } from 'src/helper/response';
import { SUCCESS, ERROR } from 'src/helper/constant';
import { EventOrganizerPreconditionRepository } from 'src/repository/event_organizer_precondition.repository';

export class AdminController {
  prisma: PrismaClient;
  userRepository: UserRepository;
  participantRepository: ParticipantRepository;
  eventOrganizerRepository: EventOrganizerRepository;
  eventRepository: EventRepository;
  eventOrganizerPreconditionRepository: EventOrganizerPreconditionRepository;
  constructor(
    prisma: PrismaClient,
    userRepository: UserRepository,
    participantRepository: ParticipantRepository,
    eventOrganizerRepository: EventOrganizerRepository,
    eventRepository: EventRepository,
    eventOrganizerPreconditionRepository: EventOrganizerPreconditionRepository,
  ) {
    this.prisma = prisma;
    this.userRepository = userRepository;
    this.participantRepository = participantRepository;
    this.eventOrganizerRepository = eventOrganizerRepository;
    this.eventRepository = eventRepository;
    this.eventOrganizerPreconditionRepository =
      eventOrganizerPreconditionRepository;
    this.findEventOrganizerPrecondition =
      this.findEventOrganizerPrecondition.bind(this);
    this.findNotVerifiedEventOrganizer =
      this.findNotVerifiedEventOrganizer.bind(this);
    this.verifyEventOrganizer = this.verifyEventOrganizer.bind(this);
  }

  async findNotVerifiedEventOrganizer(req: Request, res: Response) {
    try {
      const findNotVerifiedEO =
        await this.eventOrganizerRepository.findAllWithCondition({
          where: {
            is_verified: false,
          },
        });
      if (!findNotVerifiedEO) {
        return Res.error(res, ERROR.DataEmpty);
      }
      return Res.success(res, SUCCESS.GetAllEO, findNotVerifiedEO);
    } catch (err) {
      return Res.error(res, err);
    }
  }

  async verifyEventOrganizer(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const findEO = await this.eventOrganizerRepository.find({
        where: {
          id: Number(id),
        },
      });
      if (!findEO) {
        return Res.error(res, ERROR.UserNotFound);
      }
      if (findEO.is_verified) {
        return Res.error(res, ERROR.EOIsVerified);
      }

      const findEOPrecondition =
        await this.eventOrganizerPreconditionRepository.find({
          where: {
            event_organizer_id: findEO.id,
          },
        });
      if (!findEOPrecondition) {
        return Res.error(res, ERROR.EOPreconditionNotFound);
      }

      await this.prisma.$transaction(async (tx) => {
        const verifyEO =
          await this.eventOrganizerRepository.updateWithTransaction(tx, {
            where: {
              id: findEO.id,
            },
            data: {
              is_verified: true,
            },
          });
        if (!verifyEO) {
          throw new Error('Transaction failed');
        }

        const deletePrecondition =
          await this.eventOrganizerPreconditionRepository.deleteWithTransaction(
            tx,
            {
              where: {
                id: findEOPrecondition.id,
              },
            },
          );
        if (!deletePrecondition) {
          throw new Error('Transaction failed');
        }
      });

      return Res.success(res, SUCCESS.VerifyEO, {});
    } catch (err) {
      return Res.error(res, err);
    }
  }

  async findEventOrganizerPrecondition(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const findEO = await this.eventOrganizerRepository.find({
        where: {
          id: Number(id),
        },
      });
      if (!findEO) {
        return Res.error(res, ERROR.UserNotFound);
      }

      const findEOPrecondition =
        await this.eventOrganizerPreconditionRepository.find({
          where: {
            event_organizer_id: findEO.id,
          },
        });
      if (!findEOPrecondition) {
        return Res.error(res, ERROR.EOPreconditionNotFound);
      }
      return Res.success(res, SUCCESS.GetEOPrecondition, findEOPrecondition);
    } catch (err) {
      return Res.error(res, err);
    }
  }
}
