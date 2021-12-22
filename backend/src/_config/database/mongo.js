import mongoose from 'mongoose';

class Database {
  constructor() {
    //this.iptv();
    //this.syslog();
  }

  syslog() {
    const mongoUser = process.env.SYSLOGDB_USER;
    const mongoPass = process.env.SYSLOGDB_PASS;
    const mongoURL = process.env.SYSLOGDB_URL;
    const mongoPort = process.env.SYSLOGDB_PORT;
    const mongoBase = process.env.SYSLOGDB_BASE;

    this.syslogConnection = mongoose.createConnection(
      `mongodb://${mongoURL}:${mongoPort}/${mongoBase}`,
      {
        authSource: 'admin',
        user: mongoUser,
        pass: mongoPass,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      }
    );
  }

  iptv() {
    //TODO: fix iptv schemas
    const mongoUser = process.env.IPTVDB_USER;
    const mongoPass = process.env.IPTVDB_PASS;
    const mongoURL = process.env.IPTVDB_URL;
    const mongoPort = process.env.IPTVDB_PORT;
    const mongoBase = process.env.IPTVDB_BASE;

    this.iptvConnection = mongoose.createConnection(
      `mongodb://${mongoURL}:${mongoPort}/${mongoBase}`,
      {
        authSource: 'admin',
        user: mongoUser,
        pass: mongoPass,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      }
    );
  }
}

export default new Database();
