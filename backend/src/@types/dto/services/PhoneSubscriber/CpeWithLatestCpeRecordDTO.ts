import { CpeAttributes } from "../../../../app/models/Cpe";
import { CpeRecordAttributes } from "../../../../app/models/CpeRecord";
import { PhoneSubscriberAttributes } from "../../../../app/models/PhoneSubscriber";

export default interface CpeWithLatestCpeRecordDTO extends CpeAttributes, CpeRecordAttributes, PhoneSubscriberAttributes {
    ap_voice_vlan: string;
    ap_data_vlan: string;
    ap_name: string;
    subscriber_name: string;
}