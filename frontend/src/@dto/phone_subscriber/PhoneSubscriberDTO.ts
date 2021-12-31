import CpeWithLatestCpeRecordDTO from "../../@types/services/phone_subscriber/CpeWithLatestCpeRecordDTO";
import PhoneSubscriberInconsistenceDTO from "../../@types/services/phone_subscriber/PhoneSubscriberInconsistenceDTO";

export default interface PhoneSubscriberDTO {
    inconsistences: PhoneSubscriberInconsistenceDTO[];
    subscribers_info: CpeWithLatestCpeRecordDTO[];
}