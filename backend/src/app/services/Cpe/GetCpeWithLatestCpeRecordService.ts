import Sequelize, { QueryTypes } from 'sequelize';

import Database from '../../../_lib/database/main/index';

import Cpe from '../../models/Cpe';
import CpeRecord from '../../models/CpeRecord';
import CpeTS from "../../../@types/models/Cpe";
import CpeRecordTS from "../../../@types/models/CpeRecord";
import CpeWithLatestCpeRecordDTO from '../../../@types/services/CpeWithLatestCpeRecordDTO';

class GetCpeWithLatestCpeRecordService {
  async all(erp_ap_id?: number) {
    let where_cpe = {} as any;
    let order_cpe = [] as any;

    let where_cpe_record = { online: true } as any;
    let order_cpe_record = [['datetime', 'DESC']] as any;

    if (erp_ap_id) {
      where_cpe.erp_ap_id = erp_ap_id;
      order_cpe = [
        ['nap', 'ASC'],
        ['nap_port', 'ASC']
      ];
    }

    const cpes = await Cpe.findAll({
      where: where_cpe,
      order: order_cpe
    });

    const cpeRecord = await CpeRecord.findAll({
      where: where_cpe_record,
      order: order_cpe_record
    }) as any;

    console.log(cpes[0]);
  }

  async byErpContractId(erp_contract_id_list: number[]): Promise<CpeWithLatestCpeRecordDTO[]> {
    const records = await Database.connection.query(
      `SELECT DISTINCT ON (cpe.erp_cpe_id) cpe.erp_cpe_id, cpe.*, cper.*
      FROM cpe cpe
      LEFT JOIN cpe_record cper ON (cpe.erp_cpe_id = cper.erp_cpe_id)
      WHERE cper.online = true AND cpe.erp_contract_id IN (:erp_contract_id_list)
      ORDER by cpe.erp_cpe_id, cper.datetime DESC;`,
      {
        replacements: { erp_contract_id_list: erp_contract_id_list },
        type: QueryTypes.SELECT
      }
    ) as any as CpeWithLatestCpeRecordDTO[];

    return records;
  }
}

export default new GetCpeWithLatestCpeRecordService();
