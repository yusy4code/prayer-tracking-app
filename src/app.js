import 'dotenv/config';
import path from 'path';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { LOGGER_FORMAT } from './utils/constants.js';
import apiController from './controller/apiController.js';
import connectToDatabase from './config/db.js';

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(morgan(LOGGER_FORMAT));

// API routes
app.use('/api/v1', apiController);

// Serve static files (React/Vue/Angular front-end build)
app.use(express.static(path.join(path.resolve(), 'dist')));

// Catch-all route to serve index.html for front-end
app.get('*', (req, res) => {
  res.sendFile(path.join(path.resolve(), 'dist/index.html'));
});


connectToDatabase().then(() => {
  app.listen(PORT, () => console.log(`App started on port ${PORT}`));
}).catch(err => console.log('Error: ', err));
