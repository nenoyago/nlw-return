import { IFeedbacksRepository } from '@modules/repositories/IFeedbacksRepository';
import { IMailAdapter } from '@shared/adapters/MailAdapter/IMailAdapter';
import { AppError } from '@shared/errors/AppError';

interface ISubmitFeedbackRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: IFeedbacksRepository,
    private mailAdapter: IMailAdapter
  ) {}

  async execute({
    type,
    comment,
    screenshot,
  }: ISubmitFeedbackRequest): Promise<void> {
    if (!type) {
      throw new AppError('Type is required');
    }

    if (!comment) {
      throw new AppError('Comment is required');
    }

    if (screenshot && !screenshot.startsWith('data:image/png:base64')) {
      throw new AppError('Invalid screenshot format');
    }

    await this.feedbacksRepository.create({ type, comment, screenshot });

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        '<div style="font-family: sans-serif; font-size: 16px; color: #121212; max-width: 600px">',
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentario: ${comment}</p>`,
        screenshot ? `<img src="${screenshot}" alt="${type}" />` : ``,
        '</div>',
      ].join('\n'),
    });
  }
}
