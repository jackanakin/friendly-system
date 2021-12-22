import mongoose from 'mongoose';

const DailyStatsSchema = new mongoose.Schema(
  {
    _path: {
      type: String,
    },
    date: {
      type: Date,
    },
    audience_graph_data: {
      type: Array,
    },
    availability_graph_data: {
      type: Array,
    },
  },
  {
    collection: 'DailyStats',
  }
);

export default mongoose.model('DailyStats', DailyStatsSchema);
