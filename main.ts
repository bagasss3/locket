import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv-safe';
import cors from 'cors';
import helmet from 'helmet';
import { Service } from './src/httpsvc/httpsvc';
import { ParticipantRepository } from './src/repository/participant.repository';
import { TokenRepository } from './src/repository/token.repository';
import { EventOrganizerRepository } from './src/repository/event_organizer.repository';
import { UserRepository } from './src/repository/user.repository';
import { UserController } from './src/controller/user.controller';
import { ParticipantController } from './src/controller/participant.controller';
import { EventOrganizerController } from './src/controller/event_organizer.controller';
import { VerifyController } from './src/controller/verify.controller';
import prisma from './src/database/connection';

dotenv.config();
const port: Number = Number(process.env.PORT) || 3000;

// Express Init
const app: Application = express();

// Express Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
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
const tokenRepository = new TokenRepository(prisma);
const userRepository = new UserRepository(prisma);
const participantRepository = new ParticipantRepository(prisma);
const eventOrganizerRepository = new EventOrganizerRepository(prisma);

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

const httpSvc = new Service(
  app,
  userController,
  participantController,
  eventOrganizerController,
  verifyController,
);
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
