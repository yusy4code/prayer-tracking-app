import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import { LOGGER_FORMAT } from './utils/constants.js';
import apiController from './controller/apiController.js';
import connectToDatabase from './config/db.js';

const PORT = process.env.PORT || 3001;

const app = express();

app.use(morgan(LOGGER_FORMAT));

app.use('/api/v1', apiController);

app.get('/', (req, res) => {
  return res.status(200).json({ success: true });
});

connectToDatabase().then(() => {
  app.listen(PORT, () => console.log(`App started on port ${PORT}`));
}).catch(err => console.log('Error: ', err));
