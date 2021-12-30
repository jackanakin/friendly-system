import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface GponIntegrationAttributes {
    id: number;
    datetime: Date;
    erp_ap_id: number;
}
export interface GponIntegrationModel extends Model<GponIntegrationAttributes>, GponIntegrationAttributes { }

export type GponIntegrationStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): GponIntegrationModel;
};

export function GponIntegrationFactory(sequelize: Sequelize): GponIntegrationStatic {
    return <GponIntegrationStatic>sequelize.define("gpon_integration", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        datetime: {
            type: DataTypes.DATE,
        },
        erp_ap_id: {
            type: DataTypes.NUMBER,
        },
    }, { tableName: "gpon_integration", timestamps: false });
}
