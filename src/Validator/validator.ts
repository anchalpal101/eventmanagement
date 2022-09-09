import { check } from 'express-validator';
import { isStringObject } from 'util/types';
import validate from 'validator';

import { Validator } from '../resp-handler/Validator/validator';


class calenderValidator extends Validator {
    constructor() {
        super({

            create:
                [
                    check('title').trim().notEmpty().withMessage('title is required'),
                    check('startDate').trim().notEmpty().withMessage("startDate is required").isDate().withMessage('startdate in a date type'),
                    check('endDate').trim().notEmpty().withMessage('endDate is required').isDate().withMessage('endDate in a date type'),
                    check('startTime').trim().notEmpty().withMessage('startTime is required').matches('^([0-4]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])?$').withMessage('startTime not in a correct format'),
                    check('endTime').trim().notEmpty().withMessage('endTime is required').matches('^([0-4]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])?$').withMessage('endTime not in a correct format'),

                ],



            update:
                [
                    check('title').trim().optional().notEmpty().withMessage('title is required'),
                    check('startDate').trim().optional().notEmpty().withMessage("startDate is required").isDate().withMessage('startdate in a date type'),
                    check('endDate').trim().optional().notEmpty().withMessage('endDate is required').isDate().withMessage('endDate in a date type'),
                    check('startTime').trim().optional().notEmpty().withMessage('startTime is required').matches('^([0-4]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])?$').withMessage('startTime not in a correct format'),
                    check('endTime').trim().optional().notEmpty().withMessage('endTime is required').matches('^([0-4]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])?$').withMessage('endTime not in a correct format'),
                ]

        })
    }

}








export default calenderValidator


