import mongoose, { Connection } from 'mongoose';

class Database {
  tvConnection: Connection;

  constructor() {
    const mongoUser = process.env.IPTVDB_USER;
    const mongoPass = process.env.IPTVDB_PASS;
    const mongoURL = process.env.IPTVDB_URL;
    const mongoPort = process.env.IPTVDB_PORT;
    const mongoBase = process.env.IPTVDB_BASE;

    this.tvConnection = mongoose.createConnection(
      `mongodb://${mongoURL}:${mongoPort}/${mongoBase}`,
      {
        authSource: 'admin',
        user: mongoUser,
        pass: mongoPass,
      }
    );
  }
}

export default new Database();
