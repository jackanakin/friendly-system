import PhoneSubscriberInconsistenceDTO from "../../../../@types/services/phone_subscriber/PhoneSubscriberInconsistenceDTO";
import api from "../../../../api/api";

export async function fetchInconsistentPhoneSubscriber(): Promise<PhoneSubscriberInconsistenceDTO[]> {
    const { data }: { data: PhoneSubscriberInconsistenceDTO[] } = await api.get('phone_subscriber/inconsistences');
    return data;
}