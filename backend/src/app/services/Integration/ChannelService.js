import axios from 'axios';

import Channel from '../../schemas/Channel';

class ChannelService {
  async create(url) {
    const response = await axios.get(url);

    const lines = response.data.match(/[^\r\n]+/g);
    const currentChannels = [];

    const brGrupo = 'br-grupo=';
    const brNome = 'br-nome=';
    const brLogo = 'br-logo=';
    const brUrl = 'br-url=';
    const brPath = '/';

    lines.forEach(line => {
      if (line.includes('.m3u8')) {
        let tmp = line.substring(line.indexOf(brGrupo) + brGrupo.length);
        const group = tmp.substring(0, tmp.indexOf(','));

        tmp = line.substring(line.indexOf(brNome) + brNome.length);
        const title = tmp.substring(0, tmp.indexOf(','));

        tmp = line.substring(line.indexOf(brLogo) + brLogo.length);
        const logo = tmp.substring(0, tmp.indexOf(','));

        tmp = line.substring(line.indexOf(brUrl) + brUrl.length);
        const _url = tmp.substring(0, tmp.indexOf(';'));

        tmp = line.substring(line.lastIndexOf(brPath) + 1);
        const _path = tmp.substring(0, tmp.indexOf(';'));

        currentChannels.push({ group, title, logo, _url, _path });
      }
    });

    try {
      await Channel.collection.drop();
    } catch (err) { }

    const channels = await Channel.create(currentChannels);

    return channels;
  }
}

export default new ChannelService();
