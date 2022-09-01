const { Op } = require("sequelize");

import { Request } from "express";
import { Calender } from "../../src/models/User"
import { ERROR_TYPE } from "../resp-handler/constants";
import Exception from "../resp-handler/exception";



class eventService {
    async createEvent(req: Request) {

        try {

            // let title = req.body.title;
            // let startDate = req.body.startDate;
            // let endDate = req.body.endDate;
            // let startTime = req.body.startTime;
            // let endTime = req.body.endTime;
            let { title, startDate, endDate, startTime, endTime } = req.body

            let existDate = await this.getConflictingStatus(req?.body)
            //
            console.log('exist date ', existDate)

            if (existDate) {
                throw new Exception(ERROR_TYPE.ALREADY_EXISTS, "An event for this slot already exists.")
                // return Promise.reject("Conflict")
            }
            else {
                // throw new Exception(ERROR_TYPE.CREATED_EVENT,"Event created successfully")
                console.log("Event Created successfully")
                let createtimeEvent = await Calender.create(req.body)
                return Promise.resolve(createtimeEvent);
            }
        }
        catch (err) {

            console.log('Failed to create event:', err)
            return Promise.reject(err)
        }

    }

    // get All event
    async getEvent(req: Request) {
        try {
            let emp = await Calender.findAndCountAll()
            console.log("step1", emp)
            return Promise.resolve(emp)
        }
        catch (err) {
            console.log(">>>>>>>", err)
            return Promise.reject(err)
        }
    }



    //update all event 
    async updateEvent(req: Request) {

        try {

            //let id = req.body.id;
            // let title = req.body.title;

            // let startDate = req.body.startDate;
            // let endDate = req.body.endDate;
            // let startTime = req.body.startTime;
            // let endTime = req.body.endTime;
            let { title, startDate, endDate, startTime, endTime } = req.body || req


            let idFound = await Calender.findByPk(req.params.id);
            console.log("step 1>>>>");

            if (idFound) {
                console.log(idFound)
                // console.log("id not found", idFound)            
                let existDate = await this.getConflictingStatus(req?.body)
                console.log('exist date ', existDate)

                console.log("step 2>>>>")
                if (existDate) {
                    throw new Exception(ERROR_TYPE.ALREADY_EXISTS, "An event for this slot already exists.")
                    // return Promise.reject("Conflict")
                }
                //console.log("step3 >>>>>")
                else {
                    // throw new Exception(ERROR_TYPE.CREATED_EVENT,"Event created successfully")
                    console.log("Event updated successfully")
                    let updatetimeEvent = await Calender.update(req.body, {
                        where: { id: req.params.id }

                    })
                    return Promise.resolve(updatetimeEvent);
                }
            }
            else {
                //throw new Exception(ERROR_TYPE.NOT_FOUND, 'id notfound')
                console.log('id  not found')
            }
        }
        catch (err) {

            console.log('Failed to create event:', err)
            return Promise.reject(err)
        }

    }

    //delete all event

    async deleteEvent(req: Request) {
        try {
            await Calender.destroy({
                truncate: true

            });
        } catch (err) {

            throw ('record not deleted')

            return Promise.reject(err)

        }
    }





    //delete event by id
    async deleteEventById(req: Request) {
        try {
            let existingEvent = await Calender.findByPk(req.params.id);

            console.log(existingEvent)

            if ((!existingEvent)) {
                //throw new Exception(ERROR_TYPE.NOT_FOUND,'deleted event is not found' )
                throw ('deleted event  is not found')
            }
            await Calender.destroy({ where: { id: req.params.id } })

            return Promise.resolve('event deleted successfully')
        } catch (err) { return Promise.reject(err) }
    }


    async getConflictingStatus(requestBody) {
        const { startDate, endDate, startTime, endTime } = requestBody
        var existDate = await Calender.findOne({ where: { startDate: startDate, endDate: endDate }, })
        if (existDate) {
            //throw new Exception(ERROR_TYPE.ALREADY_EXISTS,'Date exist')
            //console.log("this start date exist")

            let existTime = await Calender.findOne({ where: { startTime: startTime, endTime: endTime }, })
            if (existTime) {
                // console.log("this time exist")
                throw new Exception(ERROR_TYPE.ALREADY_EXISTS, 'Date exist')

                // return Promise.resolve(true)
            }
            else {
                const findTEvent = await Calender.findOne({
                    where: {
                        [Op.or]: [
                            {
                                [Op.and]: [
                                    {
                                        startTime: {
                                            [Op.lt]: startTime
                                        }

                                    },
                                    {
                                        startTime: {
                                            [Op.gt]: endTime
                                        }

                                    }

                                ]
                            },
                            {
                                [Op.and]:
                                    [
                                        {
                                            startTime: {
                                                [Op.gt]: startTime
                                            }

                                        },
                                        {
                                            startTime: {
                                                [Op.lt]: endTime
                                            }

                                        }
                                    ]
                            }
                        ]

                    }
                })
                if (findTEvent) {

                    return Promise.resolve(true)
                }
                else {
                    return Promise.resolve(false)
                }
            }
        } else {
            const findEvent = await Calender.findOne({
                where: {
                    [Op.or]: [
                        {
                            [Op.and]: [
                                {
                                    startDate: {
                                        [Op.lt]: startDate
                                    }

                                },
                                {
                                    endDate: {
                                        [Op.gt]: startDate
                                    }

                                }

                            ]
                        },
                        {
                            [Op.and]: [
                                {
                                    startDate: {
                                        [Op.gt]: startDate
                                    }

                                },
                                {
                                    startDate: {
                                        [Op.lt]: endDate
                                    }

                                }
                            ]
                        }
                    ]

                }
            })
            if (findEvent) {
                return Promise.resolve(true)
            }
            else {
                return Promise.resolve(false)
            }

        }
    }
}

let eventServiceInstance = new eventService()
export default eventServiceInstance













