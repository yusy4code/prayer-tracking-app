import express from 'express';
import 'dotenv/config'

const PORT = process.env.PORT || 3001;

const app = express();

app.get('/', (req, res) => {
  return res.status(200).json({ success: true });
});

app.listen(PORT, () => console.log(`App started on port ${PORT}`));