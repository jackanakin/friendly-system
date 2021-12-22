import mongoose from 'mongoose';
import mongoDB from '../../_config/database/mongo';

const Messages = new mongoose.Schema(
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
        collection: 'Messages'
    }
);

export default mongoDB.syslogConnection.model('Messages', Messages);