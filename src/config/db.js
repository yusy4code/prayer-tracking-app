import mongoose from 'mongoose';

const uri = process.env.MONGO_URI || `mongodb://127.0.0.1:27017/myapp`;

export default async function connectToDatabase() {
  try {
    await mongoose.connect(uri);
    console.log('DB connected... ', mongoose.connection.host);
  } catch (err) {
    console.log('DB connection error : ', err.message);
  }
}
