import { prisma } from '@shared/infra/database/prismaClient';
import { IFeedbackCreateDTO } from '@modules/feedbacks/dtos/IFeedbackCreateDTO';
import { IFeedbacksRepository } from '../IFeedbacksRepository';

export class PrismaFeedbacksRepository implements IFeedbacksRepository {
  async create({
    type,
    comment,
    screenshot,
  }: IFeedbackCreateDTO): Promise<void> {
    await prisma.feedback.create({
      data: { type, comment, screenshot },
    });
  }
}
