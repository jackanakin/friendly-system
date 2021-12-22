import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface PhoneSubscriberAttributes {
    id: number;
    erp_contract_id: number;
    name: string;
    phone_number: string;
    plan_name: string;
    product_name: string;
    summit_license: string;
    summit_category: string;
    summit_partition: string;
    city: string;
}
export interface PhoneSubscriberModel extends Model<PhoneSubscriberAttributes>, PhoneSubscriberAttributes { }
export class PhoneSubscriber extends Model<PhoneSubscriberModel, PhoneSubscriberAttributes> { }

export type PhoneSubscriberStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): PhoneSubscriberModel;
};

export function PhoneSubscriberFactory(sequelize: Sequelize): PhoneSubscriberStatic {
    return <PhoneSubscriberStatic>sequelize.define("phone_subscriber", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        erp_contract_id: {
            type: DataTypes.NUMBER,
        },
        name: {
            type: DataTypes.STRING,
        },
        phone_number: {
            type: DataTypes.STRING,
        },
        plan_name: {
            type: DataTypes.STRING,
        },
        product_name: {
            type: DataTypes.STRING,
        },
        summit_license: {
            type: DataTypes.STRING,
        },
        summit_category: {
            type: DataTypes.STRING,
        },
        summit_partition: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING,
        },
    }, { tableName: "phone_subscriber", timestamps: false });
}
