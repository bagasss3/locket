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
