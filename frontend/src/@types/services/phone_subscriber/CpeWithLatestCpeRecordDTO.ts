import Cpe from "../../models/cpe/Cpe";
import CpeRecord from "../../models/cpe/CpeRecord";
import PhoneSubscriber from "../../models/phone_subscriber/PhoneSubscriber";

export default interface CpeWithLatestCpeRecordDTO extends Cpe, CpeRecord, PhoneSubscriber {
    ap_voice_vlan: string;
    ap_data_vlan: string;
    ap_name: string;
    subscriber_name: string;
}