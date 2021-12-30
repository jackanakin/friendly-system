import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface CtoTxAverageAttributes {
    id: number;
    erp_ap_id: number;
    gpon_integration_id: number;
    description: string;
    value: number;
}
export interface CtoTxAverageModel extends Model<CtoTxAverageAttributes>, CtoTxAverageAttributes { }

export type CtoTxAverageStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): CtoTxAverageModel;
};

export function CtoTxAverageFactory(sequelize: Sequelize): CtoTxAverageStatic {
    return <CtoTxAverageStatic>sequelize.define("cto_tx_average", {
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
    }, { tableName: "cto_tx_average", timestamps: false });
}
