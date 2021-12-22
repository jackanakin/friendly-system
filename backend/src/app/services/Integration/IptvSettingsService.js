import IntegrationSettings from '../../models/IntegrationSettings'

class IptvSettingsService {
    async updateUrl(url) {
        let iptv_url_setting = await IntegrationSettings.findOne({
            where: { name: "iptv_url" }
        });

        iptv_url_setting.value = url;
        await iptv_url_setting.save();

        return iptv_url_setting.value;
    }
}

export default new IptvSettingsService();