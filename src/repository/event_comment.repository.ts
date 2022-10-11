import { Prisma, PrismaClient } from '@prisma/client';

export class EventCommentRepository {
  prisma: PrismaClient;
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
    this.store = this.store.bind(this);
    this.find = this.find.bind(this);
  }

  store(payload: any) {
    const newComment = this.prisma.eventComment.create(payload);
    return newComment;
  }

  find(condition: any) {
    const comment = this.prisma.eventComment.findFirst(condition);
    return comment;
  }
}
