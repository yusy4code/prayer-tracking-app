import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import apiController from './controller/apiController.js'

const PORT = process.env.PORT || 3001;

const app = express();

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :response-time ms'));

app.use('/api/v1', apiController);

app.get('/', (req, res) => {
  return res.status(200).json({ success: true });
});

app.listen(PORT, () => console.log(`App started on port ${PORT}`));