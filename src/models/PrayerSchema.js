import mongoose from 'mongoose';

const prayerSchema = new mongoose.Schema({
  prayerDate: Date,
  fajar: Boolean,
  zuhar: Boolean,
  asar: Boolean,
  magrib: Boolean,
  isha: Boolean,
  isDone: Boolean,
});

export const PrayerModel = mongoose.model('Prayers', prayerSchema);
