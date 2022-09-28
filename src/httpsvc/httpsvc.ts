import { Application, Router } from 'express';
import { UserController } from '../controller/user.controller';
import { ParticipantController } from '../controller/participant.controller';
import { EventOrganizerController } from '../controller/event_organizer.controller';
import { VerifyController } from '../controller/verify.controller';
import { AuthController } from '../controller/auth.controller';
import { SessionController } from '../controller/session.controller';

export class Service {
  app: Application;
  userController: UserController;
  participantController: ParticipantController;
  eventOrganizerController: EventOrganizerController;
  verifyController: VerifyController;
  authController: AuthController;
  sessionController: SessionController;

  constructor(
    app: Application,
    userController: UserController,
    participantController: ParticipantController,
    eventOrganizerController: EventOrganizerController,
    verifyController: VerifyController,
    authController: AuthController,
    sessionController: SessionController,
  ) {
    this.app = app;
    this.userController = userController;
    this.participantController = participantController;
    this.eventOrganizerController = eventOrganizerController;
    this.verifyController = verifyController;
    this.authController = authController;
    this.sessionController = sessionController;
  }
  init() {
    this.api();
  }

  api() {
    this.app.get('/', this.userController.test);

    // Participant Route
    this.app.post('/participant/register', this.participantController.register);

    // Event Organizer Route
    this.app.post(
      '/eventorganizer/register',
      this.eventOrganizerController.register,
    );

    // Verification Route
    this.app.get(
      '/verification/:token',
      this.verifyController.verifyEmailParticipant,
    );

    this.app.get(
      '/verification/:token',
      this.verifyController.verifyEmailEventOrganizer,
    );

    // Authentication Route
    this.app.post('/login', this.authController.login);
    this.app.post('/refresh-token', this.sessionController.refreshToken);
  }

  web() {}
}
