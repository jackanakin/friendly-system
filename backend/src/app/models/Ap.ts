import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface ApAttributes {
    id: number;
    erp_id: number;
    description: string;
    oid_identification: string;
    oid_identification_reduced: string;
    address: string;
    snmp_port: number;
    snmp_community: string;
    voice_vlan: string;
    data_vlan: string;
    enabled: boolean;
}
export interface ApModel extends Model<ApAttributes>, ApAttributes { }
export class Ap extends Model<ApModel, ApAttributes> { }

export type ApStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): ApModel;
};

export function ApFactory(sequelize: Sequelize): ApStatic {
    return <ApStatic>sequelize.define("ap", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        erp_id: {
            type: DataTypes.INTEGER,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        oid_identification: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        oid_identification_reduced: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        snmp_port: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        snmp_community: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        voice_vlan: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        data_vlan: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        enabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    }, { tableName: "ap", timestamps: false });
}
