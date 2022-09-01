import { check } from 'express-validator';
//import express, { Request, Response } from 'express';
import { Validator } from '../resp-handler/Validator/validator';

class calenderValidator extends Validator {
    constructor() {
        super({

            create:
                [
                    check('title').trim().notEmpty().withMessage('title is required'),
                    check('startDate').trim().notEmpty().withMessage("startDate is required"),
                    check('endDate').trim().notEmpty().withMessage('endDate is required'),
                    check('startTime').trim().notEmpty().withMessage('startTime is required'),
                    check('endTime').trim().notEmpty().withMessage('endTime is required'),
                ]

        })
    }

}

export default calenderValidator


