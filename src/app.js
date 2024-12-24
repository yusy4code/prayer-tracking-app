import 'dotenv/config';
import path from 'path';
import express from 'express';
import morgan from 'morgan';
import { LOGGER_FORMAT } from './utils/constants.js';
import apiController from './controller/apiController.js';
import connectToDatabase from './config/db.js';

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan(LOGGER_FORMAT));

// API routes
app.use('/api/v1', apiController);

// Serve static files (React/Vue/Angular front-end build)
app.use(express.static(path.join(path.resolve(), 'public')));

// Catch-all route to serve index.html for front-end
app.get('*', (req, res) => {
  res.sendFile(path.join(path.resolve(), 'public/index.html'));
});

// app.get('/', (req, res) => {
//   return res.status(200).json({ success: true });
// });

connectToDatabase().then(() => {
  app.listen(PORT, () => console.log(`App started on port ${PORT}`));
}).catch(err => console.log('Error: ', err));
