import mongoose from 'mongoose';

const ChannelSchema = new mongoose.Schema(
  {
    _path: {
      type: String,
    },
    _url: {
      type: String,
    },
    title: {
      type: String,
    },
    status: {
      type: String,
    },
    group: {
      type: String,
    },
    logo: {
      type: String,
    },
    current_status: {
      type: Number,
    },
    current_sequence: {
      type: Number,
    },
  },
  {
    collection: 'Channel',
  }
);

export default mongoose.model('Channel', ChannelSchema);
