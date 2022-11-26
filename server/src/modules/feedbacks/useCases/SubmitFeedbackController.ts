import { Request, Response } from 'express';
import { HttpStatus } from '@shared/enums/HttpStatus';

import { SubmitFeedbackUseCase } from './SubmitFeedbackUseCase';
import { NodemailerMailAdapter } from '@shared/adapters/MailAdapter/implementations/NodemailerMailAdapter';
import { PrismaFeedbacksRepository } from '@modules/repositories/implementations/PrismaFeedbacksRepository';

export class SubmitFeedbackController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { type, comment, screenshot } = req.body;

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const nodemailerMailAdapter = new NodemailerMailAdapter();
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
      prismaFeedbacksRepository,
      nodemailerMailAdapter
    );

    await submitFeedbackUseCase.execute({ type, comment, screenshot });

    return res.status(HttpStatus.CREATED).send();
  }
}
