import mongoose from 'mongoose';

const FeedSchema = new mongoose.Schema(
    {
        client_src: {
            type: String,
        },
        client_req: {
            type: String,
        },
        server_res: {
            type: String,
        },
        date: {
            type: Date
        }
    },
    {
        collection: 'Feed'
    }
);

export default mongoose.model('Feed', FeedSchema);