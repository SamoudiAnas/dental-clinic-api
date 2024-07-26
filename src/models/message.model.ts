import { sequelize } from "../database/";
import { Model, DataTypes } from "sequelize";

export class Message extends Model {
  public id?: number;
  public fullName!: string;
  public email?: string;
  public phone!: string;
  public message!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export type MessageCreationAttributes = Omit<Message, "id">;

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING(255),
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    phone: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize: sequelize,
    tableName: "messages",
    timestamps: false,
  }
);
