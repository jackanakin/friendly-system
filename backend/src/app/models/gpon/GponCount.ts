import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";
import { GponIntegration } from "../../../_lib/database/main";

export interface GponCountAttributes {
    id: number;
    erp_ap_id: number;
    gpon_integration_id: number;
    description: string;
    online: number;
    offline: number;
}
export interface GponCountModel extends Model<GponCountAttributes>, GponCountAttributes { }

export type GponCountStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): GponCountModel;
};

export function GponCountFactory(sequelize: Sequelize): GponCountStatic {
    return <GponCountStatic>sequelize.define("gpon_count", {
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
            references: {
                model: GponIntegration,
                key: 'id'
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        online: {
            type: DataTypes.NUMBER,
        },
        offline: {
            type: DataTypes.NUMBER,
        },
    }, { tableName: "gpon_count", timestamps: false });
}
