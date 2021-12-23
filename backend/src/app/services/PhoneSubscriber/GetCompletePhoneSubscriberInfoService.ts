import { QueryTypes } from 'sequelize';

import CpeWithLatestCpeRecordDTO from '../../../@types/services/phone_subscriber/CpeWithLatestCpeRecordDTO';
import { database } from '../../../_lib/database/main';

class GetCompletePhoneSubscriberInfoService {
  async all(): Promise<CpeWithLatestCpeRecordDTO[]> {
    const records = await database.query(
      ` SELECT DISTINCT ON (ps.phone_number) ps.phone_number, ps.name AS subscriber_name, ps.city AS city,
        cpe.*, cper.*, ap.voice_vlan AS ap_voice_vlan, ap.data_vlan AS ap_data_vlan, ap.description AS ap_name
        FROM phone_subscriber ps 
        LEFT JOIN cpe cpe ON (ps.erp_contract_id = cpe.erp_contract_id)
        LEFT JOIN cpe_record cper ON (cpe.erp_cpe_id = cper.erp_cpe_id)
        LEFT JOIN ap ON (cpe.erp_ap_id = ap.erp_id AND cper.erp_ap_id = ap.erp_id)
        ORDER BY ps.phone_number, cper.datetime DESC;`,
      {
        type: QueryTypes.SELECT
      }
    ) as any as CpeWithLatestCpeRecordDTO[];

    return records;
  }
}

export default new GetCompletePhoneSubscriberInfoService();
