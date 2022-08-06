from datetime import datetime
from django.db import connections
from app.models.PhoneSubscriber import PhoneSubscriber
from app.models.PhonePrefixCity import PhonePrefixCity

def run():
    try:
        print("MkPhoneSubscriberIntegrationService:started="+str(datetime.now()))
        create_ps_list = []
        PhoneSubscriber.objects.all().delete()

        with connections['external_erp'].cursor() as cursor:
            cursor.execute("""
                SELECT DISTINCT pe.nome_razaosocial AS name, tan.num_virtual AS phone_number, 
                plp.descricao AS plan_name, ta.cd_contrato AS erp_contract_id, prod.nome_produto AS product_name, ta.licenca_summit AS summit_license,
                tcs.descricao AS summit_category, tps.descricao AS summit_partition, cidade.cidade AS city
                FROM mk_telefonia_assinante AS ta
                LEFT JOIN mk_pessoas AS pe ON (pe.codpessoa = ta.cd_pessoa)
                LEFT JOIN mk_logradouros AS logra ON (logra.codlogradouro = pe.codlogradouro)
                LEFT JOIN mk_bairros AS bairro ON (bairro.codbairro = logra.codbairro)
                LEFT JOIN mk_cidades AS cidade on (cidade.codcidade = bairro.codcidade)
                LEFT JOIN mk_estados AS estado ON (estado.codestado = cidade.codestado)
                LEFT JOIN mk_telefonia_fatura AS tf ON (ta.codassinante = tf.cd_assinante) 
                LEFT JOIN mk_faturas AS fatura ON (fatura.codfatura = tf.codfatura)
                LEFT JOIN mk_plano_contas AS pconta ON (pconta.codconta = tf.cd_conta)
                LEFT JOIN mk_contratos AS contrato ON (ta.cd_contrato = contrato.codcontrato)
                LEFT JOIN mk_telefonia_assinante_num AS tan ON (ta.codassinante = tan.cd_assinante)
                LEFT JOIN mk_contratos AS ct ON (ct.cliente = pe.codpessoa)
                LEFT JOIN mk_planos_acesso AS pl ON (ct.plano_acesso = pl.codplano)
                LEFT JOIN mk_crm_produtos AS prod ON (prod.cd_plano_principal = pl.codplano)
                LEFT JOIN mk_crm_produtos_composicao AS prodc ON (prodc.cd_produto = prod.codcrmproduto)
                LEFT JOIN mk_planos_acesso AS plp ON (prodc.cd_plano = plp.codplano)
                LEFT JOIN mk_telefonia_cat_summit AS tcs ON (tcs.codcatsummit = ta.cd_catsummit)
                LEFT JOIN mk_telefonia_part_summit AS tps ON (tps.codpartsummit = ta.cd_partsummit)
                WHERE contrato.cancelado = 'N' 
                AND tan.num_virtual IS NOT NULL AND ct.cancelado = 'N' AND pl.descricao LIKE '%TEL%'
                AND (plp.tipo = 2 OR prod.codcrmproduto IS NULL)
                ORDER BY name;"""
                           )

            for row in cursor.fetchall():
                tmp_ps = {}
                col_id = 0

                for col in row:
                    tmp_ps[cursor.description[col_id][0]] = col
                    col_id = col_id + 1
                
                new_ps = PhoneSubscriber(
                    name = tmp_ps['name'],
                    phone_number = tmp_ps['phone_number'],
                    plan_name = tmp_ps['plan_name'],
                    erp_contract_id = tmp_ps['erp_contract_id'],
                    product_name = tmp_ps['product_name'],
                    summit_license = tmp_ps['summit_license'],
                    summit_category = tmp_ps['summit_category'],
                    summit_partition = tmp_ps['summit_partition'],
                    city = tmp_ps['city']
                )
                create_ps_list.append(new_ps)

        if len(create_ps_list) > 0:
            PhoneSubscriber.objects.bulk_create(create_ps_list)

        print("MkPhoneSubscriberIntegrationService:finished="+str(datetime.now()))
        print("New phone_subscribers: " + str(len(create_ps_list)))
        return True
    except Exception as e:
        print('MkPhoneSubscriberIntegrationService:' + str(e))
        return False
    finally:
        connections['external_erp'].close()