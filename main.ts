import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv-safe';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';

import { Service } from './src/httpsvc/httpsvc';

import { ParticipantRepository } from './src/repository/participant.repository';
import { TokenRepository } from './src/repository/token.repository';
import { EventOrganizerRepository } from './src/repository/event_organizer.repository';
import { UserRepository } from './src/repository/user.repository';
import { SessionRepository } from './src/repository/session.repository';
import { CategoryRepository } from './src/repository/category.repository';
import { EligibilityRepository } from './src/repository/eligibility.repository';
import { EventRepository } from './src/repository/event.repository';
import { ImageRepository } from 'src/repository/image.repository';
import { EventParticipantRepository } from 'src/repository/event_participant.repository';
import { EventOrganizerPreconditionRepository } from 'src/repository/event_organizer_precondition.repository';
import { FeedbackRepository } from 'src/repository/feedback.repository';
import { EventCommentRepository } from 'src/repository/event_comment.repository';
import { SubscribeEORepository } from 'src/repository/subscribe_eo.repository';

import { UserController } from './src/controller/user.controller';
import { ParticipantController } from './src/controller/participant.controller';
import { EventOrganizerController } from './src/controller/event_organizer.controller';
import { VerifyController } from './src/controller/verify.controller';
import { AuthController } from './src/controller/auth.controller';
import { SessionController } from './src/controller/session.controller';
import { CategoryController } from './src/controller/category.controller';
import { EligibilityController } from './src/controller/eligibility.controller';
import { EventController } from './src/controller/event.controller';
import { ImageController } from 'src/controller/image.controller';
import { EventParticipantController } from 'src/controller/event_participant.controller';
import { AdminController } from 'src/controller/admin.controller';
import { FeedbackController } from 'src/controller/feedback.controller';
import { EventCommentController } from 'src/controller/event_comment.controller';
import { SubscribeEOController } from 'src/controller/subscribe_eo.controller';
import { RenderController } from 'src/views/render.controller';

import { AuthMiddleware } from './src/middleware/auth.middleware';
import { passportInit } from './src/helper/passport';
import prisma from './src/database/connection';

dotenv.config();
const port: Number = Number(process.env.PORT) || 3000;

// Express Init
const app: Application = express();

// Express Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(passport.initialize());

// Static Files
app.use(express.static('./src/public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));
app.use('/icon', express.static(__dirname + 'public/icon'));
app.use('/plugin', express.static(__dirname + 'public/plugin'));

// Set Views
app.set('views', './src/views');
app.set('view engine', 'ejs');

// Depedency Injection
// Repository
const tokenRepository = new TokenRepository(prisma);
const userRepository = new UserRepository(prisma);
const participantRepository = new ParticipantRepository(prisma);
const eventOrganizerRepository = new EventOrganizerRepository(prisma);
const sessionRepository = new SessionRepository(prisma);
const eventRepository = new EventRepository(prisma);
const categoryRepository = new CategoryRepository(prisma);
const eligibilityRepository = new EligibilityRepository(prisma);
const imageRepository = new ImageRepository(prisma);
const eventParticipantRepository = new EventParticipantRepository(prisma);
const eventOrganizerPreconditionRepository =
  new EventOrganizerPreconditionRepository(prisma);
const feedbackRepository = new FeedbackRepository(prisma);
const eventCommentRepository = new EventCommentRepository(prisma);
const subscribeEORepository = new SubscribeEORepository(prisma);

// Controller
const renderController = new RenderController();
const participantController = new ParticipantController(
  participantRepository,
  userRepository,
  tokenRepository,
  eventOrganizerRepository,
  subscribeEORepository,
);
const eventOrganizerController = new EventOrganizerController(
  userRepository,
  participantRepository,
  tokenRepository,
  imageRepository,
  eventOrganizerRepository,
  eventOrganizerPreconditionRepository,
  subscribeEORepository,
);
const userController = new UserController(
  userRepository,
  participantRepository,
  eventOrganizerRepository,
);
const verifyController = new VerifyController(
  prisma,
  userRepository,
  participantRepository,
  eventOrganizerRepository,
  tokenRepository,
);
const authController = new AuthController(
  prisma,
  userRepository,
  sessionRepository,
  eventOrganizerRepository,
  tokenRepository,
);
const sessionController = new SessionController(
  userRepository,
  sessionRepository,
);
const eventController = new EventController(
  eventRepository,
  eventOrganizerRepository,
  categoryRepository,
  eligibilityRepository,
  imageRepository,
);
const categoryController = new CategoryController(categoryRepository);
const eligibilityController = new EligibilityController(eligibilityRepository);
const imageController = new ImageController(imageRepository);
const eventParticipantController = new EventParticipantController(
  participantRepository,
  eventRepository,
  eventParticipantRepository,
);
const adminController = new AdminController(
  prisma,
  userRepository,
  participantRepository,
  eventOrganizerRepository,
  eventRepository,
  eventOrganizerPreconditionRepository,
);
const feedbackController = new FeedbackController(feedbackRepository);
const eventCommentController = new EventCommentController(
  prisma,
  eventCommentRepository,
  eventRepository,
  userRepository,
);
const subscribeEOController = new SubscribeEOController(
  participantRepository,
  eventOrganizerRepository,
  subscribeEORepository,
);

// Middleware
const authMiddleware = new AuthMiddleware(passport);

// Initiate Router for API and HTML
const routerApi = express.Router();
const routerRender = express.Router();

// HTTP Service
const httpSvc = new Service(
  app,
  routerApi,
  routerRender,
  authMiddleware,
  renderController,
  userController,
  participantController,
  eventOrganizerController,
  verifyController,
  authController,
  sessionController,
  eventController,
  categoryController,
  eligibilityController,
  imageController,
  eventParticipantController,
  adminController,
  feedbackController,
  eventCommentController,
  subscribeEOController,
);
passportInit(passport, userRepository);
httpSvc.init();

// Not found middleware
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'resource not found',
  });
});

// Start Server
app.listen(port, () => {
  console.log(`Connected successfully on port ${port}`);
});
