const mongoose = require('mongoose');
const config = require('config');


const connectDB = async () => {
  const db = process.env.MONGODB_URI || config.get('mongoURI');
  try {
    await mongoose.connect(
      db,
      {
        useNewUrlParser: true,
        autoIndex: true
      }
    );

    console.log('MongoDB is Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;