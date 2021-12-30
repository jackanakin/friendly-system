import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface CtoRxAverageAttributes {
    id: number;
    erp_ap_id: number;
    gpon_integration_id: number;
    description: string;
    value: number;
}
export interface CtoRxAverageModel extends Model<CtoRxAverageAttributes>, CtoRxAverageAttributes { }

export type CtoRxAverageStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): CtoRxAverageModel;
};

export function CtoRxAverageFactory(sequelize: Sequelize): CtoRxAverageStatic {
    return <CtoRxAverageStatic>sequelize.define("cto_rx_average", {
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
    }, { tableName: "cto_rx_average", timestamps: false });
}
