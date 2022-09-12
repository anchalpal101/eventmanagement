const { Op } = require("sequelize");
import { Request } from "express";
import { Calender } from "../models/Calender"
import { ERROR_TYPE } from "../resp-handler/constants";
import Exception from "../resp-handler/exception";



class eventService {
    // create event    
    async createEvent(req: Request) {

        try {


            let { title, startDate, endDate, startTime, endTime } = req.body

            let existDate = await this.getConflictingStatus(req?.body)
            //
            console.log('exist date ', existDate)
            if((startDate < endDate) && (startTime < endTime)){

                if (existDate) {
                    throw new Exception(ERROR_TYPE.ALREADY_EXISTS, "An event for this slot already exists.")

                }
                else {

                    console.log("Event Created successfully")
                    let createtimeEvent = await Calender.create(req.body)
                    return Promise.resolve(createtimeEvent);
                }
            }
            else{
                throw new Exception(ERROR_TYPE.NOT_ALLOWED,' either startdate > enddate  or starttime > endTime' )
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
    //get event by Id
    async getEventbyId(req: Request) {
        try {
            let getEvent = await Calender.findOne({ where: { id: req.params.id } })
            console.log('hellllllllllllllllo', getEvent)
            return Promise.resolve(getEvent)
        }
        catch (err) {
            console.log(">>>>>>>", err)
            return Promise.reject(err)
        }
    }



    //update all event 
    async updateEvent(req: Request) {

        try {


            let { title, startDate, endDate, startTime, endTime } = req.body || req

            console.log('hellllllllllllllllllllllll')
            let idFound = await Calender.findByPk(req.params.id);
            console.log("step 1>>>>");

            if (idFound) {
                console.log(idFound)

                let existDate = await this.getConflictingStatus(req?.body)
                console.log('exist date ', existDate)

                console.log("step 2>>>>")
                if (existDate) {
                    throw new Exception(ERROR_TYPE.ALREADY_EXISTS, "An event for this slot already exists.")

                }

                else {

                    console.log("Event updated successfully")
                    let updatetimeEvent = await Calender.update(req.body, {
                        where: { id: req.params.id },
                        returning:true

                    })
                    // console.log(updatetimeEvent)
                    return Promise.resolve(updatetimeEvent);

                }
            }
            else {

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

            //throw ('record not deleted')

            return Promise.reject(err)

        }
    }
    //delete event by id
    async deleteEventById(req: Request) {
        try {
            let existingEvent = await Calender.findByPk(req.params.id);

            console.log(existingEvent)

            if ((!existingEvent)) {
                throw ('deleted event  is not found')
            }
            await Calender.destroy({ where: { id: req.params.id } })

            return Promise.resolve('event deleted successfully')
        } catch (err) { return Promise.reject(err) }
    }


    async getConflictingStatus(requestBody: any) {
        const { startDate, endDate, startTime, endTime } = requestBody
        var existDate = await Calender.findOne({ where: { startDate: startDate, endDate: endDate }, })
            console.log(existDate,'step1>>>>>>>>>>>>>>')
       
            if (existDate) {
                let existTime = await Calender.findOne({ where: { startTime: startTime, endTime: endTime }, })

                if (existTime) {
                    throw new Exception(ERROR_TYPE.ALREADY_EXISTS, 'Date exist')
                }
                else {
                    const findTEvent = await Calender.findOne({
                        where: {
                            [Op.or]: [
                                {
                                    [Op.and]: [
                                        {
                                            startTime: {
                                                [Op.gt]: startTime
                                            }
                
                                        },
                                        {
                                            startTime: {
                                                [Op.eq]: endTime
                                            }
                
                                        }
                
                                    ]
                                },
                                {
                                    [Op.and]: [
                                        {
                                            endTime: {
                                                [Op.eq]: startTime
                                            }
                
                                        },
                                        {
                
                                            endTime: {
                                                [Op.lt]: endTime
                                            }
                
                                        }
                
                                    ]
                                },
                                {
                                    [Op.and]: [
                                        {
                                            startTime: {
                                                [Op.lt]: startTime
                                            }
                
                                        },
                                        {
                
                                            endTime: {
                                                [Op.eq]: endTime
                                            }
                
                                        }
                
                                    ]
                                },
                                {
                                    [Op.and]: [
                                        {
                                            startTime: {
                                                [Op.eq]: startTime
                                            }
                
                                        },
                                        {
                
                                            endTime: {
                                                [Op.gt]: endTime
                                            }
                
                                        }
                
                                    ]
                                },
                                {
                                    [Op.and]: [
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
                                },
                                {
                                    [Op.and]: [
                                        {
                                            endTime: {
                                                [Op.gt]: startTime
                                            }
                
                                        },
                                        {
                                            endTime: {
                                                [Op.lt]: endTime
                                            }
                
                                        }
                                    ]
                                },
                                {
                                    [Op.and]: [
                                        {
                                            startTime: {
                                                [Op.lt]: startTime
                                            }
                
                                        },
                                        {
                                            endTime: {
                                                [Op.gt]: endTime
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
                                            [Op.gt]: startDate
                                        }

                                    },
                                    {
                                        startDate: {
                                            [Op.eq]: endDate
                                        }

                                    }

                                ]
                            },
                            {
                                [Op.and]: [
                                    {
                                        endDate: {
                                            [Op.eq]: startDate
                                        }

                                    },
                                    {
                                        endDate: {
                                            [Op.lt]: endDate
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
                            },
                            {
                                [Op.and]: [
                                    {
                                        startDate: {
                                            [Op.eq]: startDate
                                        }

                                    },
                                    {
                                        endDate: {
                                            [Op.gt]: endDate
                                        }

                                    }
                                ]
                            },
                            {
                                [Op.and]: [
                                    {
                                        startDate: {
                                            [Op.lt]: startDate
                                        }

                                    },
                                    {

                                        endDate: {
                                            [Op.eq]: endDate
                                        }

                                    }

                                ]
                            },
                            {
                                [Op.and]: [
                                    {
                                        endDate: {
                                            [Op.gt]: startDate
                                        }

                                    },
                                    {
                                        endDate: {
                                            [Op.lt]: endDate
                                        }

                                    }
                                ]
                            },
                            {
                                [Op.and]: [
                                    {
                                        startDate: {
                                            [Op.lt]: startDate
                                        }

                                    },
                                    {
                                        endDate: {
                                            [Op.gt]: endDate
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













