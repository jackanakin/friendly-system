import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface CtoCountAttributes {
    id: number;
    erp_ap_id: number;
    gpon_integration_id: number;
    description: string;
    online: number;
    offline: number;
}
export interface CtoCountModel extends Model<CtoCountAttributes>, CtoCountAttributes { }

export type CtoCountStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): CtoCountModel;
};

export function CtoCountFactory(sequelize: Sequelize): CtoCountStatic {
    return <CtoCountStatic>sequelize.define("cto_count", {
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
        online: {
            type: DataTypes.NUMBER,
        },
        offline: {
            type: DataTypes.NUMBER,
        },
    }, { tableName: "cto_count", timestamps: false });
}
