import Joi from 'joi';

export const valRegisParticipant = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().max(100).required(),
  phoneNumber: Joi.string().required(),
  password: Joi.string().min(6).required(),
  repassword: Joi.string().min(6).required(),
});

export const valRegisEventOrganizer = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().max(100).required(),
  password: Joi.string().min(6).required(),
  repassword: Joi.string().min(6).required(),
});

export const valLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const valForgotPassword = Joi.object({
  email: Joi.string().email().required(),
});

export const valResetPassword = Joi.object({
  password: Joi.string().min(6).required(),
  repassword: Joi.string().min(6).required(),
});

export const valCreateEvent = Joi.object({
  name: Joi.string().min(3).required(),
  date_time: Joi.date().required(),
  precondition: Joi.number().min(0).max(3).required(),
  image_id: Joi.number().required(),
  category_id: Joi.number().required(),
  eligibility_id: Joi.number().required(),
  description: Joi.string().min(3).required(),
});

export const valCreateCategory = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().min(3).max(50).required(),
});

export const valCreateEligibility = Joi.object({
  name: Joi.string().min(1).required(),
  description: Joi.string().min(3).max(50).required(),
});

export const valNotifyEO = Joi.object({
  event_organizer_id: Joi.number().required(),
  report_message: Joi.string().min(6).max(255).required(),
});
