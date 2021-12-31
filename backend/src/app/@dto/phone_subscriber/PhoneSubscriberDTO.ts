import CpeWithLatestCpeRecordDTO from "../../../@types/dto/services/PhoneSubscriber/CpeWithLatestCpeRecordDTO";
import PhoneSubscriberInconsistenceDTO from "../../../@types/dto/services/PhoneSubscriber/PhoneSubscriberInconsistenceDTO";

export default interface PhoneSubscriberDTO {
    inconsistences: PhoneSubscriberInconsistenceDTO[];
    subscribers_info: CpeWithLatestCpeRecordDTO[];
}