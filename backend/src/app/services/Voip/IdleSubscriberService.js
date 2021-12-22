import MKDatabase from '../../../_lib/database/mkData';

class IdleSubscriberService {
    async index() {
        return await MKDatabase.rawQuery(`
            SELECT pe.nome_razaosocial AS subscriber, con.adesao AS accession, con.previsao_vencimento AS due_date
            FROM mk_pessoas pe
            LEFT JOIN mk_contratos AS con ON (con.cliente = pe.codpessoa)
            LEFT JOIN mk_crm_produtos AS produto ON (con.plano_acesso = produto.cd_plano_principal)
            LEFT JOIN mk_telefonia_assinante AS ta ON (pe.codpessoa = ta.cd_pessoa AND con.codcontrato = ta.cd_contrato)
            LEFT JOIN mk_telefonia_assinante_num AS tan ON (ta.codassinante = tan.cd_assinante)
            WHERE produto.interesse_em_telefone IS TRUE AND con.cancelado = 'N' AND tan.num_virtual IS NULL
            ORDER BY pe.nome_razaosocial;
      `);
    }
}

export default new IdleSubscriberService();
