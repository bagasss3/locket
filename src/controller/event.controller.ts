import { Request, Response } from 'express';
import { EventRepository } from '../repository/event.repository';
import { EventOrganizerRepository } from '../repository/event_organizer.repository';
import { CategoryRepository } from '../repository/category.repository';
import { EligibilityRepository } from '../repository/eligibility.repository';
import { ERROR, SUCCESS, ROLE } from '../helper/constant';
import { Res } from '../helper/response';
import { valCreateEvent } from '../helper/validation';
import { generateID } from '../helper/vegenerate';
import { ImageRepository } from 'src/repository/image.repository';

export class EventController {
  eventRepository: EventRepository;
  eventOrganizerRepository: EventOrganizerRepository;
  categoryRepository: CategoryRepository;
  eligibilityRepository: EligibilityRepository;
  imageRepository: ImageRepository;
  constructor(
    eventRepository: EventRepository,
    eventOrganizerRepository: EventOrganizerRepository,
    categoryRepository: CategoryRepository,
    eligibilityRepository: EligibilityRepository,
    imageRepository: ImageRepository,
  ) {
    this.eventRepository = eventRepository;
    this.eventOrganizerRepository = eventOrganizerRepository;
    this.categoryRepository = categoryRepository;
    this.eligibilityRepository = eligibilityRepository;
    this.imageRepository = imageRepository;
    this.create = this.create.bind(this);
    this.findAll = this.findAll.bind(this);
    this.findByID = this.findByID.bind(this);
    this.update = this.update.bind(this);
  }

  async create(req: Request, res: Response) {
    try {
      const {
        name,
        date_time,
        image_id,
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
        image_id,
      );
      if (!checkEventCondition) {
        return Res.error(res, ERROR.CategoryOrEligibilityDoesNotExist);
      }

      const storeEvent = await this.eventRepository.store({
        data: {
          id: generateID(),
          name,
          event_organizer_id: findEO.id,
          date_time,
          image_id,
          category_id,
          eligibility_id,
          description,
        },
      });
      if (!storeEvent) {
        return Res.error(res, ERROR.InternalServer);
      }

      return Res.success(res, SUCCESS.CreateEvent, storeEvent);
    } catch (err) {
      return Res.error(res, err);
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const events = await this.eventRepository.findAll();
      return Res.success(res, SUCCESS.GetAllEvents, events);
    } catch (err) {
      return Res.error(res, err);
    }
  }

  async findByID(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const event = await this.eventRepository.find({
        where: {
          id: Number(id),
        },
        include: {
          eligibility: true,
          category: true,
        },
      });
      if (!event) {
        return Res.error(res, ERROR.EventDoesNotExist);
      }
      return Res.success(res, SUCCESS.GetEvent, event);
    } catch (err) {
      return Res.error(res, err);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const findEvent = await this.eventRepository.find({
        where: {
          id: Number(id),
        },
      });
      if (!findEvent) {
        return Res.error(res, ERROR.EventDoesNotExist);
      }
    } catch (err) {
      return Res.error(res, err);
    }
  }

  async isEventValid(
    category_id: number,
    eligibility_id: number,
    image_id: number,
  ) {
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

    const findImage = await this.imageRepository.find({
      where: {
        id: image_id,
      },
    });
    if (!findImage) {
      return false;
    }
    return true;
  }
}
