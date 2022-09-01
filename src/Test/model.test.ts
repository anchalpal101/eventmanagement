import sequelize, { DATE } from "sequelize"
import { Calender } from "../models/User"
//const uuid = require("uuid")
const uuid = require('uuid')

let fakeId = uuid.v4()
let eventinfo = {
    id: fakeId,
    title: "Anchal",
    description: "hello",
    startDate: new Date(),
    endDate: new Date(),
    startTime: new Date(),
    endTime: new Date()

}

describe('Calender model test cases', () => {
    test('create event successfully', async () => {
        let events = await Calender.create(eventinfo);
        expect(events).toBeInstanceOf(Object)
        expect(events).toHaveProperty('title')
        expect(events).toHaveProperty('description')
        expect(events).toHaveProperty('startDate')
        expect(events).toHaveProperty('endDate')
        expect(events).toHaveProperty('startTime')
        expect(events).toHaveProperty('endTime')

    })


    test('find all event', async () => {
        let events = await Calender.findAll()
        expect(events).toBeInstanceOf(Object)
        expect(events[0]).toHaveProperty('title')
        expect(events[0]).toHaveProperty('description')
        expect(events[0]).toHaveProperty('startDate')
        expect(events[0]).toHaveProperty('endDate')
        expect(events[0]).toHaveProperty('startTime')
        expect(events[0]).toHaveProperty('endTime')
    })


    test('update user successfully', async() => {
        var event = await Calender.update({ title: 'hii' },{where:{ id: fakeId }, returning: true})
        expect(event[1][0].title).toBe('hii')
    })

 })

test("Should give error while finding a tenant with invalid title", async () => {
    try {
        await Calender.findOne({
            where: { title: "invalidtitle" },
        });
    } catch (error) {
        //SequelizeValidationError
        expect(error).toBeInstanceOf(sequelize.DatabaseError);

    }
});




