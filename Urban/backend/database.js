import mongoose, { connect } from 'mongoose';

const connectDB = async () => {
  try {
    await connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/urban-services');
    console.log('MongoDB connected successfully');

    // Drop legacy unique index on firebaseUID if it exists. This index was
    // created when Firebase auth was used; after removing Firebase we must
    // remove the unique constraint to allow creating users without that field.
    try {
      const db = mongoose.connection.db;
      const usersColl = db.collection('users');
      const indexes = await usersColl.indexes();
      const hasFirebaseIndex = indexes.some(idx => idx.name === 'firebaseUID_1');
      if (hasFirebaseIndex) {
        await usersColl.dropIndex('firebaseUID_1');
        console.log('Dropped legacy index firebaseUID_1 from users collection');
      }
    } catch (idxErr) {
      // If index doesn't exist or drop fails, log and continue.
      console.warn('Could not drop firebaseUID_1 index (it may not exist):', idxErr.message || idxErr);
    }

  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;