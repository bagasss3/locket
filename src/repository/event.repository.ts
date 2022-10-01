import { PrismaClient } from '@prisma/client';

export class EventRepository {
  prisma: PrismaClient;
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
    this.store = this.store.bind(this);
  }

  store(payload: any) {
    const newEvent = this.prisma.event.create(payload);
    return newEvent;
  }
}
