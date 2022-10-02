import { Request, Response } from 'express';
import { EligibilityRepository } from '../repository/eligibility.repository';
import { Res } from '../helper/response';
import { ERROR, SUCCESS } from '../helper/constant';
import { valCreateEligibility } from '../helper/validation';
import { generateID } from '../helper/vegenerate';

export class EligibilityController {
  eligibilityRepository: EligibilityRepository;
  constructor(eligibilityRepository: EligibilityRepository) {
    this.eligibilityRepository = eligibilityRepository;
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
  }

  async create(req: Request, res: Response) {
    try {
      const { name, description } = req.body;
      const result = valCreateEligibility.validate(req.body);
      if (result.error) {
        return Res.error(res, result.error.details[0].message);
      }

      const findEligibility = await this.eligibilityRepository.find({
        where: {
          name,
        },
      });
      if (findEligibility) {
        return Res.error(res, ERROR.EligibilityAlreadyExist);
      }

      const createEligibility = await this.eligibilityRepository.store({
        data: {
          id: generateID(),
          name,
          description,
        },
      });
      if (!createEligibility) {
        return Res.error(res, ERROR.InternalServer);
      }

      return Res.success(res, SUCCESS.CreateEligibility, createEligibility);
    } catch (err) {
      return Res.error(res, err);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const eligibilities = await this.eligibilityRepository.findAll();
      return Res.success(res, SUCCESS.GetAllEligibility, eligibilities);
    } catch (err) {
      return Res.error(res, err);
    }
  }
}
