const uuid = require('uuid')
import { Request } from "express";
import eventServiceInstance from "../services/calenderCrud";
import calender from "../services/calenderCrud";



let fakeId = uuid.v4()

let eventinfo = {

    id: fakeId,
    title: "Audit",
    description: "yellow",
    startDate: new Date('2052-09-30'),
    endDate: new Date('2052-10-30'),
    startTime: "09:00:00",
    endTime: "10:00:00",



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
        expect(event.startDate).toStrictEqual("2052-09-30")
        expect(event.startDate > event.endDate)
        expect(event.startTime).toBe('09:00:00')



    })
})
test('conflicting status', async () => {

    let requestBody = {

        startDate: new Date('2052-09-30'),
        endDate: new Date('2052-10-30'),
        startTime: "09:30:00",
        endTime: "11:00:00"

    }



    let event = await eventServiceInstance.getConflictingStatus(requestBody)
    console.log(event, 'helllllllllllllllooooooooooooo')
    expect(event).toBe(false)

})
//     //if it conflict there status is true
//     // else its false      


test('get all event successfully', async () => {

    let event = await calender.getEvent(eventinfo as unknown as Request)
    expect(event.rows[0]).toHaveProperty('title');
})
//negative 
test('get all event successfully', async () => {

    let event = await calender.getEvent(eventinfo as unknown as Request)
    expect(event.rows[9]).not.toBeDefined()
})


test('delete event successfully', async () => {
    let event = await calender.deleteEventById({ params: { id: fakeId } } as unknown as Request)
    console.log(event, 'eventtttttt')
    expect(event).toBe(true)
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






