import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface GponTxAverageAttributes {
    id: number;
    erp_ap_id: number;
    gpon_integration_id: number;
    description: string;
    value: number;
}
export interface GponTxAverageModel extends Model<GponTxAverageAttributes>, GponTxAverageAttributes { }

export type GponTxAverageStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): GponTxAverageModel;
};

export function GponTxAverageFactory(sequelize: Sequelize): GponTxAverageStatic {
    return <GponTxAverageStatic>sequelize.define("gpon_tx_average", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        erp_ap_id: {
            type: DataTypes.INTEGER,
        },
        gpon_integration_id: {
            type: DataTypes.INTEGER,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        value: {
            type: DataTypes.NUMBER,
        },
    }, { tableName: "gpon_tx_average", timestamps: false });
}
