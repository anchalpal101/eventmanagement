import database from '../config/db'
import sequelize from 'sequelize'

import { DataTypes } from "sequelize";


// Database connection instance
let databaseInstance = database

export interface CalenderInterface {
    id?: string
    title: string
    description: string
    startDate: Date
    endDate: Date
    startTime: Date
    endTime: Date
}
export interface ICalenderInterface
    extends sequelize.Instance<CalenderInterface>,
    CalenderInterface { }

// Sequelize Model
export const Calender: sequelize.Model<
    ICalenderInterface,
    CalenderInterface
> = databaseInstance.define<ICalenderInterface, CalenderInterface>(
    'calenders',
    {
        id: {
            type: sequelize.UUID,
            defaultValue: sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },

        title: {
            type: sequelize.STRING,
            allowNull: false,

        },

        description: {
            type: sequelize.STRING,
            allowNull: true,
        },

        startDate: {
            type: sequelize.DATEONLY,
            allowNull: false,
        },

        endDate: {
            type: sequelize.DATEONLY,
            allowNull: false,
        },
        startTime: {
            type: sequelize.TIME,
            allowNull: false,
        },

        endTime: {
            type: sequelize.TIME,
            allowNull: false,
        },



    },
    {
        tableName: 'calenders',
        // Auto-create timestamps
        timestamps: true,
        // Enable soft deletes
        paranoid: true,
    },


)




