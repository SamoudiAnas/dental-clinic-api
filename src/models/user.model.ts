import { sequelize } from "../database/";
import { Model, Sequelize, DataTypes } from "sequelize";

export class User extends Model {
  public id?: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public phone?: string;
  public appointments?: string[];
  public birthdate?: Date;
  public country?: string;

  private admin?: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export type UserCreationAttributes = Omit<User, "id">;

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    appointments: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: sequelize,
    tableName: "users",
    timestamps: false,
  }
);
