import { Application, Router } from 'express';
import { UserController } from '../controller/user.controller';
import { ParticipantController } from '../controller/participant.controller';
import { EventOrganizerController } from '../controller/event_organizer.controller';
import { VerifyController } from '../controller/verify.controller';

export class Service {
  app: Application;
  userController: UserController;
  participantController: ParticipantController;
  eventOrganizerController: EventOrganizerController;
  verifyController: VerifyController;

  constructor(
    app: Application,
    userController: UserController,
    participantController: ParticipantController,
    eventOrganizerController: EventOrganizerController,
    verifyController: VerifyController,
  ) {
    this.app = app;
    this.userController = userController;
    this.participantController = participantController;
    this.eventOrganizerController = eventOrganizerController;
    this.verifyController = verifyController;
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
  }

  web() {}
}
