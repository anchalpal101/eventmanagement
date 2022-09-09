import eventServiceInstance from '../../src/services/calenderCrud';
import { RESPONSE_STATUS } from '../resp-handler/constants';
import { respHndlr } from '../resp-handler';
import { Request, Response } from 'express';
import { Result } from 'express-validator';

class calenderController {

    create(req: Request, res: Response) {
        eventServiceInstance.createEvent(req)
            .then((result) => {
                respHndlr.sendSuccess(res, result, RESPONSE_STATUS.SUCCESS_CREATED)
            })
            .catch((err) => {
                respHndlr.sendError(res, err)
            })
    }



    readAll(req: Request, res: Response) {
        eventServiceInstance.getEvent(req)
            .then((result) => {
                respHndlr.sendSuccess(res, result, RESPONSE_STATUS.SUCCESS)

            })
            .catch((err) => {
                respHndlr.sendError(res, err)

            })
    }

    readbyId(req: Request, res: Response) {
        eventServiceInstance.getEventbyId(req)
            .then((result) => {
                respHndlr.sendSuccess(res, result, RESPONSE_STATUS.SUCCESS)

            })
            .catch((err) => {
                respHndlr.sendError(res, err)

            })
    }

    deleteEvent(req: Request, res: Response) {
        eventServiceInstance.deleteEvent(req)
            .then((result) => {

                respHndlr.sendSuccess(res, result, RESPONSE_STATUS.SUCCESS)
            })
            .catch((err) => {
                respHndlr.sendError(res, err)
            })
    }

    deleteEventById(req: Request, res: Response) {
        eventServiceInstance.deleteEventById(req)
            .then((result) => {
                respHndlr.sendSuccess(res, result, RESPONSE_STATUS.SUCCESS)
            })
            .catch((err) => {
                respHndlr.sendError(res, err)
            })
    }

    updateEvent(req: Request, res: Response) {
        eventServiceInstance.updateEvent(req)
            .then((result) => {
                respHndlr.sendSuccess(res, result, RESPONSE_STATUS.SUCCESS_CREATED)
            })
            .catch((err) => {
                respHndlr.sendError(res, err)
            })
    }



}




export default calenderController