from datetime import datetime
from django.db import connections
from app.models.Cpe import Cpe

def run():
    try:
        print("MkErpIntegrationService:started="+str(datetime.now()))
        create_cpe_list = []
        current_cpes = Cpe.objects.count()
        print("current cpes = {}".format(current_cpes))
        Cpe.objects.all().delete()

        with connections['external_erp'].cursor() as cursor:
            cursor.execute("""
                SELECT pe.nome_razaosocial AS name, caixa.identificacao AS nap, splp.id_porta AS nap_port, 
                con.codconexao AS erp_cpe_id, con.tecnologia as technology,
                con.esta_reduzida, con.obs, con.cadastrado, con.conexao_bloqueada,
                con.username AS username, con.senha_equipamento AS device_password, con.mac_address, con.onu_serial, con.velocidades_formatadas,
                con.cadastrado as cadastrado, pop.nas_address, con.codponto_acesso as erp_ap_id, con.contrato AS erp_contract_id, con.obs AS observation,
                address_list.nome_lista AS address_list
                FROM mk_conexoes con
                LEFT JOIN mk_pessoas pe ON (pe.codpessoa = con.codcliente)
                LEFT JOIN mk_pontos_acesso pop ON con.codponto_acesso = pop.codpontoacesso
                LEFT JOIN mk_fiber_splitter_portas splp ON (splp.codsplitterporta = con.id_porta_splitter)
                LEFT JOIN mk_fiber_splitter spl ON (spl.codsplitter = splp.cd_splitter)
                LEFT JOIN mk_fiber_caixa caixa ON (caixa.codcaixa = spl.cd_caixa)
                LEFT JOIN mk_address_list address_list ON (address_list.codaddlist = con.address_list)
                WHERE con.tecnologia = 'F' AND con.conexao_bloqueada = 'N';"""
                           )

            for row in cursor.fetchall():
                tmp_cpe = {}
                col_id = 0

                for col in row:
                    tmp_cpe[cursor.description[col_id][0]] = col
                    col_id = col_id + 1
                
                new_cpe = Cpe(
                    erp_cpe_id=tmp_cpe['erp_cpe_id'],
                    name=tmp_cpe['name'],
                    username=tmp_cpe['username'],
                    device_password=tmp_cpe['device_password'],
                    mac_address=tmp_cpe['mac_address'].upper() if tmp_cpe['mac_address'] != None else '',
                    onu_serial=tmp_cpe['onu_serial'].upper() if tmp_cpe['onu_serial'] != None else '',
                    nap=tmp_cpe['nap'].upper() if tmp_cpe['nap'] != None else '',
                    nap_port=tmp_cpe['nap_port'] if tmp_cpe['nap_port'] != None else -1,
                    technology=tmp_cpe['technology'],
                    cadastrado=tmp_cpe['cadastrado'],
                    integration_updated=True,
                    erp_ap_id=tmp_cpe['erp_ap_id'],
                    erp_contract_id=tmp_cpe['erp_contract_id'],
                    observation = tmp_cpe['observation'],
                    address_list = tmp_cpe['address_list']
                )
                create_cpe_list.append(new_cpe)

        if len(create_cpe_list) > 0:
            Cpe.objects.bulk_create(create_cpe_list)

        print("MkErpIntegrationService:finished="+str(datetime.now()))
        print("New cpes: " + str(len(create_cpe_list)))
        return True
    except Exception as e:
        print('MkErpIntegrationService:' + str(e))
        return False
    finally:
        connections['external_erp'].close()