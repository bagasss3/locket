import express, { Application, Request, Response, NextFunction } from 'express';
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

import { UserController } from './src/controller/user.controller';
import { ParticipantController } from './src/controller/participant.controller';
import { EventOrganizerController } from './src/controller/event_organizer.controller';
import { VerifyController } from './src/controller/verify.controller';
import { AuthController } from './src/controller/auth.controller';
import { SessionController } from './src/controller/session.controller';
import { CategoryController } from './src/controller/category.controller';
import { EligibilityController } from './src/controller/eligibility.controller';
import { EventController } from './src/controller/event.controller';

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
app.use((req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({
      success: false,
      message: 'Not allowed to access this resource',
    });
  }
  return next();
});

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

// Controller
const participantController = new ParticipantController(
  participantRepository,
  userRepository,
  tokenRepository,
);
const eventOrganizerController = new EventOrganizerController(
  userRepository,
  tokenRepository,
);
const userController = new UserController();
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
);
const categoryController = new CategoryController(categoryRepository);
const eligibilityController = new EligibilityController(eligibilityRepository);

// Middleware
const authMiddleware = new AuthMiddleware(passport);

// HTTP Service
const httpSvc = new Service(
  app,
  authMiddleware,
  userController,
  participantController,
  eventOrganizerController,
  verifyController,
  authController,
  sessionController,
  eventController,
  categoryController,
  eligibilityController,
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
