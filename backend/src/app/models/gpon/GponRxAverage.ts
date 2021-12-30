import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface GponRxAverageAttributes {
    id: number;
    erp_ap_id: number;
    gpon_integration_id: number;
    description: string;
    value: number;
}
export interface GponRxAverageModel extends Model<GponRxAverageAttributes>, GponRxAverageAttributes { }

export type GponRxAverageStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): GponRxAverageModel;
};

export function GponRxAverageFactory(sequelize: Sequelize): GponRxAverageStatic {
    return <GponRxAverageStatic>sequelize.define("gpon_rx_average", {
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
    }, { tableName: "gpon_rx_average", timestamps: false });
}
