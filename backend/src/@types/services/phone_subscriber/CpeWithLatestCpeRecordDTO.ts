import Cpe from "../../models/Cpe";
import CpeRecord from "../../models/CpeRecord";
import PhoneSubscriber from "../../models/PhoneSubscriber";

export default interface CpeWithLatestCpeRecordDTO extends Cpe, CpeRecord, PhoneSubscriber {
    ap_voice_vlan: string;
    ap_data_vlan: string;
    ap_name: string;
    subscriber_name: string;
}