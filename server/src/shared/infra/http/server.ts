import express from 'express';
import cors from 'cors';
import 'express-async-errors';

import { routes } from './routes';
import errorHandler from '@shared/errors/handler';

const app = express();

app.use(
  cors({
    origin: '*',
  })
);
app.use(express.json());
app.use(routes);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
