import MKDatabase from '../../../_lib/database/mkData';

class BillingCheckService {
    async index(period) {
        return await MKDatabase.rawQuery(`
            SELECT pe.nome_razaosocial AS subscriber, ta.cd_contrato AS id, pconta.valor_lancamento AS value, contrato.adesao AS accession
            FROM mk_telefonia_assinante AS ta
            LEFT JOIN mk_pessoas AS pe ON (pe.codpessoa = ta.cd_pessoa)
            LEFT JOIN mk_telefonia_fatura AS tf ON (ta.codassinante = tf.cd_assinante) 
            LEFT JOIN mk_faturas AS fatura ON (fatura.codfatura = tf.codfatura)
            LEFT JOIN mk_plano_contas AS pconta ON (pconta.codconta = tf.cd_conta)
            LEFT JOIN mk_contratos AS contrato ON (ta.cd_contrato = contrato.codcontrato)
            WHERE (tf.competencia LIKE '${period}' OR tf.competencia IS NULL) AND contrato.cancelado LIKE 'N'
            ORDER BY subscriber;
      `);
    }
}

export default new BillingCheckService();