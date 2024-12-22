import express from 'express';

const router = express.Router();

router.get('/prayers', (req, res) => {
  const response = [
    {
      prayer_date: '2024-01-01',
      fajar: true,
      zuhar: true,
      asar: false,
      magrib: true,
      isha: false,
      is_done: false,
    }
  ];
  return res.status(200).json(response);
});

export default router;