import { SubmitFeedbackUseCase } from '@modules/feedbacks/useCases/SubmitFeedbackUseCase';
import { AppError } from '@shared/errors/AppError';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

describe('Create feedback', () => {
  let submitFeedbackUseCase: SubmitFeedbackUseCase;

  beforeEach(() => {
    submitFeedbackUseCase = new SubmitFeedbackUseCase(
      { create: createFeedbackSpy },
      { sendMail: sendMailSpy }
    );
  });

  it('should be able to submit a feedback', async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: 'BUG',
        comment: 'Example comment',
        screenshot: 'data:image/png:base64,B12egsuBafhasufhn12i3u',
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit a feedback without type', async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: '',
        comment: 'Example comment',
        screenshot: 'data:image/png:base64,B12egsuBafhasufhn12i3u',
      })
    ).rejects.toEqual(new AppError('Type is required'));
  });

  it('should not be able to submit a feedback without comment', async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: 'BUG',
        comment: '',
        screenshot: 'data:image/png:base64,B12egsuBafhasufhn12i3u',
      })
    ).rejects.toEqual(new AppError('Comment is required'));
  });

  it('should not be able to submit a feedback with and invalid screenshot', async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: 'BUG',
        comment: 'Example comment',
        screenshot: 'test.jpg',
      })
    ).rejects.toEqual(new AppError('Invalid screenshot format'));
  });
});
