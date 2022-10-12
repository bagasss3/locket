import { Application, Router } from 'express';
import multer from 'src/helper/multer';
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
import { AdminController } from 'src/controller/admin.controller';
import { FeedbackController } from 'src/controller/feedback.controller';
import { EventCommentController } from 'src/controller/event_comment.controller';
import { SubscribeEOController } from 'src/controller/subscribe_eo.controller';
import {
  DEFAULT_ALLOWED_ROLES,
  ADMIN_ALLOWED_ROLES,
  EO_ALLOWED_ROLES,
  NON_ADMIN_ALLOWED_ROLES,
  PARTICIPANT_ALLOWED_ROLES,
} from 'src/helper/constant';

export class Service {
  app: Application;
  routerApi: Router;
  routerRender: Router;
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
  adminController: AdminController;
  feedbackController: FeedbackController;
  eventCommentController: EventCommentController;
  subscribeEOController: SubscribeEOController;
  constructor(
    app: Application,
    routerApi: Router,
    routerRender: Router,
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
    adminController: AdminController,
    feedbackController: FeedbackController,
    eventCommentController: EventCommentController,
    subscribeEOController: SubscribeEOController,
  ) {
    this.app = app;
    this.routerApi = routerApi;
    this.routerRender = routerRender;
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
    this.adminController = adminController;
    this.feedbackController = feedbackController;
    this.eventCommentController = eventCommentController;
    this.subscribeEOController = subscribeEOController;
  }
  init() {
    this.app.use('/api', this.authMiddleware.apiAuth, this.api());
    this.app.use('/', this.web());
  }

  api() {
    // Authentication Route
    this.routerApi.post('/login', this.authController.login);
    this.routerApi.post('/refresh-token', this.sessionController.refreshToken);
    this.routerApi.post('/forgot-password', this.authController.forgotPassword);
    this.routerApi.post(
      '/reset-password/:token',
      this.authController.resetPassword,
    );

    // User Route
    this.routerApi.get(
      '/profile',
      this.authMiddleware.userAuth,
      this.userController.profile,
    );

    // Admin Route
    this.routerApi.get(
      '/admin/event-organizers',
      this.authMiddleware.userAuth,
      this.authMiddleware.roleChecker(ADMIN_ALLOWED_ROLES),
      this.adminController.findNotVerifiedEventOrganizer,
    );
    this.routerApi.get(
      '/admin/event-organizers/:id',
      this.authMiddleware.userAuth,
      this.authMiddleware.roleChecker(ADMIN_ALLOWED_ROLES),
      this.adminController.findEventOrganizerPrecondition,
    );
    this.routerApi.put(
      '/admin/event-organizers/:id',
      this.authMiddleware.userAuth,
      this.authMiddleware.roleChecker(ADMIN_ALLOWED_ROLES),
      this.adminController.verifyEventOrganizer,
    );
    this.routerApi.put(
      '/admin/event/:id',
      this.authMiddleware.userAuth,
      this.authMiddleware.roleChecker(ADMIN_ALLOWED_ROLES),
      this.adminController.verifyEvent,
    );
    this.routerApi.get(
      '/admin/event',
      this.authMiddleware.userAuth,
      this.authMiddleware.roleChecker(ADMIN_ALLOWED_ROLES),
      this.adminController.findUnverifiedEvents,
    );
    this.routerApi.post(
      '/admin/report',
      this.authMiddleware.userAuth,
      this.authMiddleware.roleChecker(ADMIN_ALLOWED_ROLES),
      this.adminController.notifyEO,
    );

    // Participant Route
    this.routerApi.post(
      '/participant/register',
      this.participantController.register,
    );
    this.routerApi.get(
      '/participant/subscribed',
      this.authMiddleware.userAuth,
      this.authMiddleware.roleChecker(PARTICIPANT_ALLOWED_ROLES),
      this.participantController.findSubscribedEO,
    );

    // Event Organizer Route
    this.routerApi.post(
      '/eventorganizer/register',
      this.eventOrganizerController.register,
    );
    this.routerApi.post(
      '/eventorganizer/verify-precondition',
      this.authMiddleware.userAuth,
      this.authMiddleware.roleChecker(EO_ALLOWED_ROLES),
      this.eventOrganizerController.createPrecondition,
    );
    this.routerApi.get(
      '/eventorganizer',
      this.eventOrganizerController.findAllVerifiedEO,
    );
    this.routerApi.get(
      '/eventorganizer/subscriber',
      this.authMiddleware.userAuth,
      this.authMiddleware.roleChecker(EO_ALLOWED_ROLES),
      this.eventOrganizerController.findAllSubscriber,
    );
    this.routerApi.get(
      '/eventorganizer/count/subscriber',
      this.authMiddleware.userAuth,
      this.authMiddleware.roleChecker(EO_ALLOWED_ROLES),
      this.eventOrganizerController.countAllSubscriber,
    );

    // Category Route
    this.routerApi.post(
      '/admin/category',
      this.authMiddleware.userAuth,
      this.authMiddleware.roleChecker(ADMIN_ALLOWED_ROLES),
      this.categoryController.create,
    );
    this.routerApi.get('/category', this.categoryController.findAll);

    // Eligibility Route
    this.routerApi.post(
      '/admin/eligibility',
      this.authMiddleware.userAuth,
      this.authMiddleware.roleChecker(ADMIN_ALLOWED_ROLES),
      this.eligibilityController.create,
    );
    this.routerApi.get('/eligibility', this.eligibilityController.findAll);

    // Verification Route
    this.routerApi.get(
      '/verification-participant/:token',
      this.verifyController.verifyEmailParticipant,
    );
    this.routerApi.get(
      '/verification-eo/:token',
      this.verifyController.verifyEmailEventOrganizer,
    );

    // Event Route
    this.routerApi.post(
      '/eventorganizer/event',
      this.authMiddleware.userAuth,
      this.authMiddleware.roleChecker(EO_ALLOWED_ROLES),
      this.eventController.create,
    );
    this.routerApi.get('/event', this.eventController.findAll);
    this.routerApi.get('/event/:id', this.eventController.findByID);
    this.routerApi.put(
      '/event/:id',
      this.authMiddleware.userAuth,
      this.authMiddleware.roleChecker(EO_ALLOWED_ROLES),
      this.eventController.update,
    );
    this.routerApi.delete(
      '/event/:id',
      this.authMiddleware.userAuth,
      this.authMiddleware.roleChecker(EO_ALLOWED_ROLES),
      this.eventController.delete,
    );

    // Image Route
    this.routerApi.post(
      '/image',
      multer.single('image'),
      this.imageController.create,
    );
    this.routerApi.get('/image', this.imageController.findAll);
    this.routerApi.get('/image/:id', this.imageController.find);

    // Event Participant Route
    this.routerApi.post(
      '/register-event',
      this.authMiddleware.userAuth,
      this.authMiddleware.roleChecker(PARTICIPANT_ALLOWED_ROLES),
      this.eventParticipantController.registerEvent,
    );

    // Feedback Route
    this.routerApi.post(
      '/feedback',
      this.authMiddleware.userAuth,
      this.authMiddleware.roleChecker(NON_ADMIN_ALLOWED_ROLES),
      this.feedbackController.create,
    );
    this.routerApi.get('/feedback', this.feedbackController.findAll);

    // EventComment Route
    this.routerApi.post(
      '/comment',
      this.authMiddleware.userAuth,
      this.authMiddleware.roleChecker(DEFAULT_ALLOWED_ROLES),
      this.eventCommentController.create,
    );
    this.routerApi.get(
      '/parent/comment/:event_id',
      this.eventCommentController.findAllParentCommentsByEventID,
    );
    this.routerApi.get(
      '/child/comment/:parent_comment_id',
      this.eventCommentController.findAllChildCommentsByParentCommentID,
    );
    this.routerApi.get(
      '/comment/:comment_id',
      this.eventCommentController.findByID,
    );
    this.routerApi.put(
      '/comment/:comment_id',
      this.authMiddleware.userAuth,
      this.eventCommentController.updateComment,
    );
    this.routerApi.delete(
      '/comment/:comment_id',
      this.authMiddleware.userAuth,
      this.eventCommentController.deleteComment,
    );

    // Subscribe Route
    this.routerApi.post(
      '/subscribe',
      this.authMiddleware.userAuth,
      this.authMiddleware.roleChecker(PARTICIPANT_ALLOWED_ROLES),
      this.subscribeEOController.subscribeEO,
    );
    this.routerApi.delete(
      '/subscribe',
      this.authMiddleware.userAuth,
      this.authMiddleware.roleChecker(PARTICIPANT_ALLOWED_ROLES),
      this.subscribeEOController.unsubscribeEO,
    );

    return this.routerApi;
  }

  web() {
    this.routerRender.get('/home', this.renderController.home);
    return this.routerRender;
  }
}
