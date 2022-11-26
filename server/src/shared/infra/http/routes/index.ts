import { Router } from 'express';
import { feedbackRoutes } from './feedbacks.routes';

const routes = Router();

routes.use('/feedbacks', feedbackRoutes);

export { routes };
