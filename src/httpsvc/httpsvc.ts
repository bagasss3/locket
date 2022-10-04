import { Application, Router } from 'express';
import { UserController } from '../controller/user.controller';
import { ParticipantController } from '../controller/participant.controller';
import { EventOrganizerController } from '../controller/event_organizer.controller';
import { VerifyController } from '../controller/verify.controller';
import { AuthController } from '../controller/auth.controller';
import { SessionController } from '../controller/session.controller';
import { EventController } from '../controller/event.controller';
import { CategoryController } from '../controller/category.controller';
import { EligibilityController } from '../controller/eligibility.controller';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { ImageController } from 'src/controller/image.controller';
import multer from 'src/helper/multer';

export class Service {
  app: Application;
  authMiddleware: AuthMiddleware;
  userController: UserController;
  participantController: ParticipantController;
  eventOrganizerController: EventOrganizerController;
  verifyController: VerifyController;
  authController: AuthController;
  sessionController: SessionController;
  eventController: EventController;
  categoryController: CategoryController;
  eligibilityController: EligibilityController;
  imageController: ImageController;

  constructor(
    app: Application,
    authMiddleware: AuthMiddleware,
    userController: UserController,
    participantController: ParticipantController,
    eventOrganizerController: EventOrganizerController,
    verifyController: VerifyController,
    authController: AuthController,
    sessionController: SessionController,
    eventController: EventController,
    categoryController: CategoryController,
    eligibilityController: EligibilityController,
    imageController: ImageController,
  ) {
    this.app = app;
    this.authMiddleware = authMiddleware;
    this.userController = userController;
    this.participantController = participantController;
    this.eventOrganizerController = eventOrganizerController;
    this.verifyController = verifyController;
    this.authController = authController;
    this.sessionController = sessionController;
    this.eventController = eventController;
    this.categoryController = categoryController;
    this.eligibilityController = eligibilityController;
    this.imageController = imageController;
  }
  init() {
    this.api();
  }

  api() {
    this.app.get(
      '/',
      this.authMiddleware.userAuth,
      this.authMiddleware.eventOrganizerAuth,
      this.userController.test,
    );

    // Category Route
    this.app.post(
      '/admin/category',
      this.authMiddleware.userAuth,
      this.authMiddleware.adminAuth,
      this.categoryController.create,
    );
    this.app.get('/category', this.categoryController.findAll);

    // Eligibility Route
    this.app.post(
      '/admin/eligibility',
      this.authMiddleware.userAuth,
      this.authMiddleware.adminAuth,
      this.eligibilityController.create,
    );
    this.app.get('/eligibility', this.eligibilityController.findAll);

    // Participant Route
    this.app.post('/participant/register', this.participantController.register);

    // Event Organizer Route
    this.app.post(
      '/eventorganizer/register',
      this.eventOrganizerController.register,
    );

    // Verification Route
    this.app.get(
      '/verification-participant/:token',
      this.verifyController.verifyEmailParticipant,
    );
    this.app.get(
      '/verification-eo/:token',
      this.verifyController.verifyEmailEventOrganizer,
    );

    // Authentication Route
    this.app.post('/login', this.authController.login);
    this.app.post('/refresh-token', this.sessionController.refreshToken);
    this.app.post('/forgot-password', this.authController.forgotPassword);
    this.app.post('/reset-password/:token', this.authController.resetPassword);

    // Event Route
    this.app.post(
      '/eventorganizer/event',
      this.authMiddleware.userAuth,
      this.authMiddleware.eventOrganizerAuth,
      this.eventController.create,
    );
    this.app.get('/event', this.eventController.findAll);
    this.app.get('/event/:id', this.eventController.findByID);
    this.app.put(
      '/event/:id',
      this.authMiddleware.userAuth,
      this.authMiddleware.eventOrganizerAuth,
      this.eventController.update,
    );
    this.app.delete(
      '/event/:id',
      this.authMiddleware.userAuth,
      this.authMiddleware.eventOrganizerAuth,
      this.eventController.delete,
    );

    // Image Route
    this.app.post(
      '/image',
      multer.single('image'),
      this.imageController.create,
    );
    this.app.get('/image', this.imageController.findAll);
    this.app.get('/image/:id', this.imageController.find);
  }

  web() {}
}
