import MKDatabase from '../../../_lib/database/mkData';

class AttendanceReportService {
    async index(startPeriod, endPeriod) {
        const queryResult = await MKDatabase.rawQuery(`
            SELECT pe.nome_razaosocial AS subscriber, ate.codatendimento AS id, atesp.nome_subprocesso AS process,
            CASE WHEN length(caixa.identificacao) > 0 THEN caixa.identificacao ELSE pop.ssid END AS ssid,
            ate.dt_abertura || ' ' || ate.hr_abertura AS open_date, 
            ate.info_cliente AS user_report,
            CASE WHEN ate.finalizado = 'S' THEN CONCAT(ate.operador_encerramento, ' encerrou dizendo: ', ate.texto_encerramento)
            ELSE '' END AS technical_report
            FROM mk_atendimento ate
            LEFT JOIN mk_pessoas pe ON (pe.codpessoa = ate.cliente_cadastrado)
            LEFT JOIN mk_conexoes con ON (ate.conexao = con.codconexao)
            LEFT JOIN mk_fiber_splitter splitter ON (splitter.codsplitter = con.cd_splitter)
            LEFT JOIN mk_fiber_caixa caixa ON (caixa.codcaixa = splitter.cd_caixa)
            LEFT JOIN mk_pontos_acesso pop ON (con.codponto_acesso = pop.codpontoacesso)
            LEFT JOIN mk_ate_processos atep ON (atep.codprocesso = ate.cd_processo)
            LEFT JOIN mk_ate_subprocessos atesp  ON (atesp.codsubprocesso = ate.cd_subprocesso)
            WHERE (ate.dt_abertura BETWEEN '${startPeriod}' AND '${endPeriod}') AND ( atep.nome_processo LIKE '%03-%' OR atep.nome_processo LIKE '%3-%' )
            ORDER BY open_date DESC
      `);

        return queryResult;
    }
}

export default new AttendanceReportService();