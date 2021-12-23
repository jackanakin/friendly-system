export default interface PhoneSubscriber {
    erp_contract_id: number;
    name: string;
    phone_number: string;
    plan_name: string | null;
    product_name: string | null;
    summit_license: string | null;
    summit_category: string | null;
    summit_partition: string | null;
    city: string;
}