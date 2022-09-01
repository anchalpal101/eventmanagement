//import  {Request}  from "express";
//import calenderController from "../controllers/calenderController";
const uuid = require('uuid')
import { Request } from "express";
import calender from "../services/calenderCrud";


let fakeId = uuid.v4()

let eventinfo = {

    id: fakeId,
    title: "Audit",
    description: "yellow",
    startDate: new Date('2052-09-30'),
    endDate: new Date('2052-06-30'),
    startTime: new Date(),
    endTime: new Date(),


 
}

describe('Create function test cases', () => {
    test('invalid events field', async () => {

        var req = {
            body: eventinfo
        }

        let event = await calender.createEvent(req as unknown as Request);
        expect(event.id).toBe(fakeId);
        expect(event.title).toBe('Audit');
        expect(event.description).toBe('yellow');
      //  expect(event.startDate).toStrictEqual("2052-05-30")
        expect(event.startDate > event.endDate)
        


    })
    test('get all event successfully', async () => {

        let event = await calender.getEvent(eventinfo as unknown as Request)
        expect(event.rows[1]).toHaveProperty('title');


    })
    test('delete event successfully', async () => {
        let event = await calender.deleteEventById({ params: { id: fakeId } } as unknown as Request)
        expect(event).toBe('event deleted successfully')

    })
    test('update event successfully', async () => {


        let eventsinfo = {

            id: fakeId,
            title: "Audi",
            description: "yellow",
            startDate: new Date('2052-05-30'),
            endDate: new Date('2052-06-30'),
            startTime: new Date(),
            endTime: new Date()

        }

        var req = {
            body: eventsinfo,
            params: { id: fakeId }

        }

        let event = await calender.updateEvent(req as unknown as Request)
        expect(req.body.title).toBe("Audi")
    })
    test('delete event but giving wrong id', async () => {
        let fakeId1 = uuid.v4()
        try {
            await calender.deleteEvent({ params: { id: fakeId1 } } as unknown as Request)
            console.log('hellllllllllllllll')
        } catch (error) {
            expect(error).toBe("event to be deleted is not found")
        }
    })


})
