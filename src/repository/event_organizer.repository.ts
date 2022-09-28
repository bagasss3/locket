import { Prisma, PrismaClient } from '@prisma/client';

export class EventOrganizerRepository {
  prisma: PrismaClient;
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
    this.storeWithTransaction = this.storeWithTransaction.bind(this);
    this.find = this.find.bind(this);
  }

  storeWithTransaction(tx: Prisma.TransactionClient, payload: any) {
    const newEventOrganizer = tx.event_Organizer.create(payload);
    return newEventOrganizer;
  }

  find(condition: any) {
    const eventOrganizer = this.prisma.event_Organizer.findFirst(condition);
    return eventOrganizer;
  }
}
