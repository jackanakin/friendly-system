import mongoose from 'mongoose';

const RealTimeStatsSchema = new mongoose.Schema(
  {
    _path: {
      type: String,
    },
    clients: {
      type: Array,
    },
    date: {
      type: Date,
    },
    audience: {
      type: Number,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: 'RealTimeStats',
  }
);

export default mongoose.model('RealTimeStats', RealTimeStatsSchema);
