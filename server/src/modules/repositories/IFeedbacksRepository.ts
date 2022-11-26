import { IFeedbackCreateDTO } from '@modules/feedbacks/dtos/IFeedbackCreateDTO';

export interface IFeedbacksRepository {
  create(data: IFeedbackCreateDTO): Promise<void>;
}
