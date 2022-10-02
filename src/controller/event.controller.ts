import { Request, Response } from 'express';
import { EventRepository } from '../repository/event.repository';
import { EventOrganizerRepository } from '../repository/event_organizer.repository';
import { CategoryRepository } from '../repository/category.repository';
import { EligibilityRepository } from '../repository/eligibility.repository';
import { ERROR, SUCCESS, ROLE } from '../helper/constant';
import { Res } from '../helper/response';
import { valCreateEvent } from '../helper/validation';
import { generateID } from '../helper/vegenerate';

export class EventController {
  eventRepository: EventRepository;
  eventOrganizerRepository: EventOrganizerRepository;
  categoryRepository: CategoryRepository;
  eligibilityRepository: EligibilityRepository;
  constructor(
    eventRepository: EventRepository,
    eventOrganizerRepository: EventOrganizerRepository,
    categoryRepository: CategoryRepository,
    eligibilityRepository: EligibilityRepository,
  ) {
    this.eventRepository = eventRepository;
    this.eventOrganizerRepository = eventOrganizerRepository;
    this.categoryRepository = categoryRepository;
    this.eligibilityRepository = eligibilityRepository;
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
  }

  async create(req: Request, res: Response) {
    try {
      const {
        name,
        date_time,
        photo,
        category_id,
        eligibility_id,
        description,
      } = req.body;
      const result = valCreateEvent.validate(req.body);
      if (result.error) {
        return Res.error(res, result.error.details[0].message);
      }

      const findEO = await this.eventOrganizerRepository.find({
        where: {
          user_id: req.user?.id,
        },
      });
      if (!findEO) {
        return Res.error(res, ERROR.UserNotFound);
      }

      const checkEventCondition = await this.isEventValid(
        category_id,
        eligibility_id,
      );
      if (!checkEventCondition) {
        return Res.error(res, ERROR.CategoryOrEligibilityDoesNotExist);
      }

      const createEvent = await this.eventRepository.store({
        data: {
          id: generateID(),
          name,
          event_organizer_id: findEO.id,
          date_time,
          photo,
          category_id,
          eligibility_id,
          description,
        },
      });
      if (!createEvent) {
        return Res.error(res, ERROR.InternalServer);
      }

      return Res.success(res, SUCCESS.CreateEvent, createEvent);
    } catch (err) {
      return Res.error(res, err);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const events = await this.eventRepository.findAll();
      return Res.success(res, SUCCESS.GetAllEvents, events);
    } catch (err) {
      return Res.error(res, err);
    }
  }

  async isEventValid(category_id: number, eligibility_id: number) {
    const findCategory = await this.categoryRepository.find({
      where: {
        id: category_id,
      },
    });
    if (!findCategory) {
      return false;
    }

    const findEligibility = await this.eligibilityRepository.find({
      where: {
        id: eligibility_id,
      },
    });
    if (!findEligibility) {
      return false;
    }
    return true;
  }
}
