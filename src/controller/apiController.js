import express from 'express';
import { PrayerModel } from '../models/PrayerSchema.js';
import { isValidDate } from '../utils/helpers.js';

const router = express.Router();

router.get('/prayers/:id', async (req, res) => {
  const prayerId = req.params.id;
  if (!prayerId) {
    return res.status(400).json({ success: false, error: 'Invalid prayerId' });
  }
  try {
    const prayer = await PrayerModel.findOne({ _id: prayerId });
    return res.status(200).json(prayer);
  } catch (error) {
    console.log('Error: ', error.message);
    return res.status(500).json({ success: false, error: 'Internal server error.' });
  }

});

router.get('/prayers', async (req, res) => {
  const { prayerDate, isDone } = req.query || {};

  if (prayerDate && !isValidDate(prayerDate)) {
    return res.status(400).json({ success: false, error: 'Invalid Date' });
  }

  const query = {};
  if (prayerDate) {
    query.prayerDate = new Date(prayerDate);
  }
  if (isDone !== undefined) {
    query.isDone = isDone.toUpperCase() === 'TRUE' ? true : false;
  }
  const data = await PrayerModel.find(query).sort({ prayerDate: -1 });
  return res.status(200).json(data);
});

router.get('/health', (req, res) => {
  const health = {
    status: 'UP',
    uptime: process.uptime(),
    timestamp: Date.now(),
  };
  console.log(`Health result: ${JSON.stringify(health)}`);
  return res.status(200).json(health); // Send health status as a JSON response
});

export default router;
