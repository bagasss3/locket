import { Application, Request, Response, NextFunction, Router } from 'express';
import { RenderController } from 'src/views/render.controller';
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
import { EventParticipantController } from 'src/controller/event_participant.controller';
import multer from 'src/helper/multer';

export class Service {
  app: Application;
  router: Router;
  authMiddleware: AuthMiddleware;
  renderController: RenderController;
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
  eventParticipantController: EventParticipantController;

  constructor(
    app: Application,
    router: Router,
    authMiddleware: AuthMiddleware,
    renderController: RenderController,
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
    eventParticipantController: EventParticipantController,
  ) {
    this.app = app;
    this.router = router;
    this.authMiddleware = authMiddleware;
    this.renderController = renderController;
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
    this.eventParticipantController = eventParticipantController;
  }
  init() {
    this.app.use('/api', this.authMiddleware.apiAuth, this.api());
    this.app.use('/', this.web());
  }

  api() {
    this.router.get(
      '/',
      this.authMiddleware.userAuth,
      this.authMiddleware.eventOrganizerAuth,
      this.userController.profile,
    );

    // Category Route
    this.router.post(
      '/admin/category',
      this.authMiddleware.userAuth,
      this.authMiddleware.adminAuth,
      this.categoryController.create,
    );
    this.router.get('/category', this.categoryController.findAll);

    // Eligibility Route
    this.router.post(
      '/admin/eligibility',
      this.authMiddleware.userAuth,
      this.authMiddleware.adminAuth,
      this.eligibilityController.create,
    );
    this.router.get('/eligibility', this.eligibilityController.findAll);

    // Participant Route
    this.router.post(
      '/participant/register',
      this.participantController.register,
    );

    // Event Organizer Route
    this.router.post(
      '/eventorganizer/register',
      this.eventOrganizerController.register,
    );

    // Verification Route
    this.router.get(
      '/verification-participant/:token',
      this.verifyController.verifyEmailParticipant,
    );
    this.router.get(
      '/verification-eo/:token',
      this.verifyController.verifyEmailEventOrganizer,
    );

    // Authentication Route
    this.router.post('/login', this.authController.login);
    this.router.post('/refresh-token', this.sessionController.refreshToken);
    this.router.post('/forgot-password', this.authController.forgotPassword);
    this.router.post(
      '/reset-password/:token',
      this.authController.resetPassword,
    );

    // Event Route
    this.router.post(
      '/eventorganizer/event',
      this.authMiddleware.userAuth,
      this.authMiddleware.eventOrganizerAuth,
      this.eventController.create,
    );
    this.router.get('/event', this.eventController.findAll);
    this.router.get('/event/:id', this.eventController.findByID);
    this.router.put(
      '/event/:id',
      this.authMiddleware.userAuth,
      this.authMiddleware.eventOrganizerAuth,
      this.eventController.update,
    );
    this.router.delete(
      '/event/:id',
      this.authMiddleware.userAuth,
      this.authMiddleware.eventOrganizerAuth,
      this.eventController.delete,
    );

    // Image Route
    this.router.post(
      '/image',
      multer.single('image'),
      this.imageController.create,
    );
    this.router.get('/image', this.imageController.findAll);
    this.router.get('/image/:id', this.imageController.find);

    // Event Participant Route
    this.router.post(
      '/register-event',
      this.authMiddleware.userAuth,
      this.authMiddleware.participantAuth,
      this.eventParticipantController.registerEvent,
    );

    return this.router;
  }

  web() {
    this.router.get('/home', this.renderController.home);
    return this.router;
  }
}
