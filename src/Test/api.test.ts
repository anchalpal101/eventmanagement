const uuid = require('uuid')
import request from "supertest";
import { expressInstance } from "../app";
//import { Calender } from "../models/Calender";
import eventServiceInstance from "../services/calenderCrud";



let fakeId = uuid.v4()

let events = {
    id: fakeId,
    title: "Audit",
    description: "yellow",
    startDate: '1999-08-30',
    endDate: '1999-08-31',
    startTime: '09:06:30',
    endTime: '09:06:30',

}

describe("POST /api/v1/calender", () => {

    it("should check post data", async () => {
        const response = await request(expressInstance).post('/api/v1/calender').send(events);
        const data = response.body.result
        expect(response.statusCode).toBe(201);
        expect(data.endTime).toBe(events["endTime"]);
    });
});



describe('GET /api/v1/calender', () => {

    it('should return statusCode 200', async () => {
        const response = await request(expressInstance).get('/api/v1/calender');
        expect(response.statusCode).toBe(200);
        expect(response.body.error).toBe(undefined);
    })
    it("should return true", async () => {
        const response = await request(expressInstance).get('/api/v1/calender');
        expect(response.body.result.count >= 1).toBe(true);

    });

})

describe("Update events", () => {
    beforeAll(async () => {
        await request(expressInstance).post("/api/v1/calender").send(events);
    })

    it("should update item if it exists", async () => {
        const response = await request(expressInstance).put(`/api/v1/update/${events.id}`).send({
            startTime: "08:30:21",
            title: 'yes'
        });
        console.log("...........................................", response)
        expect(response.statusCode).toBe(201);
    });
});

describe("Delete one event", () => {

    it("should delete one item", async () => {
        const response = await request(expressInstance).delete(`/api/v1/calender/${events.id}`)
        const data = response.body
        console.log(data, 'tiododod')
        expect(response.statusCode).toBe(200)
    });
});
