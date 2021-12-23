import GetCompletePhoneSubscriberInfoService from "../../services/PhoneSubscriber/GetCompletePhoneSubscriberInfoService";
import { PhonePrefixCity, PhoneSubscriber } from "../../../_lib/database/main";
import PhoneSubscriberServiceErrors from "../../@messages/services/PhoneSubscriber/PhoneSubscriberServiceErrors";
import PhoneSubscriberInconsistenceDTO from "../../../@types/dto/services/PhoneSubscriber/PhoneSubscriberInconsistenceDTO";
import CpeWithLatestCpeRecordDTO from "../../../@types/dto/services/PhoneSubscriber/CpeWithLatestCpeRecordDTO";

class CheckPhoneSubscriberInconsistencesService {
  async run(): Promise<PhoneSubscriberInconsistenceDTO[]> {
    let inconsistent: PhoneSubscriberInconsistenceDTO[] = [];

    const phoneSubscribers = await PhoneSubscriber.findAll({
      order: [
        ['erp_contract_id', 'ASC']
      ]
    });
    const prefixCityList = await PhonePrefixCity.findAll({});

    if (phoneSubscribers.length > 0) {
      const subscribers_info = await GetCompletePhoneSubscriberInfoService.all();
      phoneSubscribers.forEach((ps, ps_index) => {
        let found = false;
        subscribers_info.forEach(ps_extended => {
          if (ps.phone_number === ps_extended.phone_number) {
            found = true;
          }
        });

        if (!found) {
          subscribers_info.push(ps as any as CpeWithLatestCpeRecordDTO);
        }

        //check if it's duplicated
        phoneSubscribers.forEach((ps_again, ps_again_index) => {
          if (ps.phone_number === ps_again.phone_number && ps.erp_contract_id === ps_again.erp_contract_id && ps_index !== ps_again_index) {
            const inconsistence_message = `Número ${ps_again.phone_number} Assinante ${ps_again.name} Número duplicado`;
            inconsistent.push({ inconsistence_message } as PhoneSubscriberInconsistenceDTO);
          }
        });
      });

      subscribers_info.forEach(sub => {

        //check if number belongs to the city
        //TODO
        const belongToCity = prefixCityList.find(x => x.prefix === sub.phone_number.substring(0, 4));
        if (belongToCity && belongToCity.city.toUpperCase() !== sub.city.toUpperCase()) {
          const inconsistence_message = `Número ${sub.phone_number} Assinante ${sub.name} PREFIXO NÃO PERTENCE A CIDADE DO ENDEREÇO`;
          inconsistent.push({ inconsistence_message } as PhoneSubscriberInconsistenceDTO);
        } else if (!belongToCity) {
          const inconsistence_message = `Número ${sub.phone_number} Assinante ${sub.name} não possui prefixo cadastrado`;
          inconsistent.push({ inconsistence_message } as PhoneSubscriberInconsistenceDTO);
        }

        const phoneNumbersByContract = subscribers_info.filter(si => si.erp_contract_id === sub.erp_contract_id);
        let phoneNumbersFound = 0;

        //check if is registered on the ONU FXS
        phoneNumbersByContract.forEach(phone => {
          if (phone.pots_enable && phone.phone_number === phone.tel_num) {
            phoneNumbersFound++;
          }
        });

        //check if voice VLAN is used
        phoneNumbersByContract.forEach(phone => {
          if (phone.port_vlan && phone.port_vlan.indexOf(phone.ap_voice_vlan)) {
            let voice_vlan_in_lan_port_index = -1;

            const portVlans: string[] = phone.port_vlan.includes('#') ? phone.port_vlan.split('#') : [phone.port_vlan];
            portVlans.forEach((vlans, index) => {
              if (vlans.includes(phone.ap_voice_vlan)) {
                voice_vlan_in_lan_port_index = index;
              }
            })

            if (voice_vlan_in_lan_port_index >= 0) {
              phoneNumbersFound = phoneNumbersByContract.length;
            }
          }
        });

        //check if it's behind NAT
        if (sub.observation && sub.observation.includes('#SIP_NAT#')) {
          phoneNumbersFound = phoneNumbersByContract.length;
        }

        // if found all phoneNumbers skip
        if (phoneNumbersByContract.length === phoneNumbersFound) {
          return;
        }

        //push 
        phoneNumbersByContract.forEach(inc => {
          const inconsistence_message = `Número ${inc.phone_number} Assinante ${inc.subscriber_name} Registro SIP inconsistente`;
          inconsistent.push({ inconsistence_message } as PhoneSubscriberInconsistenceDTO);
        });
      });

      return inconsistent;
    }

    throw new Error(PhoneSubscriberServiceErrors.phoneSubscribersEmpty.message);
  }
}

export default new CheckPhoneSubscriberInconsistencesService();
