import { sequelize } from "../database/";
import { Model, DataTypes } from "sequelize";

export type Duration = "30" | "60" | "90" | "120";

export class Appointment extends Model {
  public id?: number;
  public date!: Date;
  public duration!: Duration;
  public userId!: number;

  public createdAt!: Date;
  public updatedAt!: Date;
}

export type AppointmentCreationAttributes = Omit<Appointment, "id">;

Appointment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    duration: {
      type: DataTypes.ENUM("30", "60", "90", "120"),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "appointments",
    timestamps: true,
  }
);
