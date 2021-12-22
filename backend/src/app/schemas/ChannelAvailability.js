import mongoose from 'mongoose';

const ChannelAvailabilitySchema = new mongoose.Schema(
  {
    _path: {
      type: String,
    },
    status: {
      type: Number,
    },
    date: {
      type: Date,
    },
  },
  {
    collection: 'ChannelAvailability',
  }
);

export default mongoose.model('ChannelAvailability', ChannelAvailabilitySchema);
