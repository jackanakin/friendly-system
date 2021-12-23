import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface PhonePrefixCityAttributes {
    id: number;
    prefix: string;
    city: string;
}
export interface PhonePrefixCityModel extends Model<PhonePrefixCityAttributes>, PhonePrefixCityAttributes { }

export type PhonePrefixCityStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): PhonePrefixCityModel;
};

export function PhonePrefixCityFactory(sequelize: Sequelize): PhonePrefixCityStatic {
    return <PhonePrefixCityStatic>sequelize.define("phone_prefix_city", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        prefix: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, { tableName: "phone_prefix_city", timestamps: false });
}
