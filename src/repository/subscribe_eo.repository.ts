import { PrismaClient } from '@prisma/client';

export class SubscribeEORepository {
  prisma: PrismaClient;
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
    this.store = this.store.bind(this);
    this.findAll = this.findAll.bind(this);
  }

  store(payload: any) {
    const subscribe = this.prisma.subscribeEO.create(payload);
    return subscribe;
  }

  findAll(condition: any) {
    const subscriber = this.prisma.subscribeEO.findMany(condition);
    return subscriber;
  }

  find(condition: any) {
    const subscribe = this.prisma.subscribeEO.findFirst(condition);
    return subscribe;
  }
}
