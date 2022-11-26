import { Router } from 'express';
import { SubmitFeedbackController } from '@modules/feedbacks/useCases/SubmitFeedbackController';

const feedbackRoutes = Router();

const createFeedbackController = new SubmitFeedbackController();

feedbackRoutes.post('/', createFeedbackController.handle);

export { feedbackRoutes };
