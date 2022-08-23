import * as Yup from 'yup';

import { Ap } from "../../_lib/database/main";
import CreateApDTO from '../@dto/ap/CreateApDTO';
import { ListApDTO } from '../@dto/ap/ListApDTO';

class ApService {

    async list(): Promise<ListApDTO[] | string> {
        try {
            const apList = (await Ap.findAll({
                attributes: ["erp_id", "description", "address", "snmp_port", "snmp_community", "enabled"]
            })).map(ap => ap.toJSON() as ListApDTO );

            return apList;
        } catch (error: any) {
            return String(error);
        }
    }

    async enable(erp_id: number): Promise<string> {
        try {
            const ap = await Ap.findOne({
                where: { erp_id },
            });

            if (ap) {
                ap.enabled = true;
                await ap.save();
                return `${ap.description} ativado`;
            } else {
                return `${erp_id} não encontrado`;
            }
        } catch (error: any) {
            return String(error);
        }
    }

    async disable(erp_id: number): Promise<string> {
        try {
            const ap = await Ap.findOne({
                where: { erp_id },
            });

            if (ap) {
                ap.enabled = false;
                await ap.save();
                return `${ap.description} desativado`;
            } else {
                return `${erp_id} não encontrado`;
            }
        } catch (error: any) {
            return String(error);
        }
    }

    async remove(erp_id: number): Promise<string> {
        try {
            const res = await Ap.destroy({
                where: {
                    erp_id
                }
            });

            return `${res} ap(s) removido(s)`;
        } catch (error: any) {
            return String(error);
        }
    }

    async create(ap: CreateApDTO): Promise<string> {
        try {
            const schema = Yup.object().shape({
                cod_mk: Yup.number().required(),
                nome_mk: Yup.string().required(),
                ip: Yup.string().required(),
                snmp_port: Yup.number().required(),
                snmp_community: Yup.string().required(),
                vlan: Yup.string().required(),
            });

            if (!(await schema.isValid(ap))) {
                return "Ap inválido";
            }

            const apExists = await Ap.findOne({
                where: { erp_id: ap.cod_mk },
            });

            if (apExists) {
                return `Ap com código ${ap.cod_mk} já existe`;
            }

            await Ap.create({
                address: ap.ip, data_vlan: ap.vlan, description: ap.nome_mk,
                enabled: true, erp_id: ap.cod_mk, oid_identification: '', oid_identification_reduced: '',
                snmp_community: ap.snmp_community, snmp_port: ap.snmp_port, voice_vlan: String(Number(ap.vlan) - 100)
            });

            return `Ap ${ap.nome_mk} código MK ${ap.cod_mk} criado!`;
        } catch (error: any) {
            return String(error);
        }
    }

}

export default new ApService();
