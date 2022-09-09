import { Router } from "express"
import calenderController from "./controllers/calenderController";
import CalenderValidator from "./Validator/validator"
//import validator from "../src/resp-handler/Validator";



const mainRouter = Router()
const event = new calenderController()
const calendarValidator  = new CalenderValidator()
// For Calender CRUD

mainRouter.route('/api/v1/calender').post(calendarValidator.makeValidation('create'),event.create)

mainRouter.route('/api/v1/calender').get(event.readAll)
mainRouter.route('/api/v1/calender/:id').get(event.readbyId)
mainRouter.route('/api/v1/calender').delete(event.deleteEvent)
mainRouter.route('/api/v1/calender/:id').delete(event.deleteEventById)
mainRouter.route('/api/v1/calender/:id').put(event.updateEvent)

// router.post(
//     '/', 
//     userController.validate('createUser'), 
//     userController.createUser,
//   )

export default mainRouter





























// function check(requestBody) {
//     try {
//             let title = requestBody
//             if (title !== null) {
//             console.log('ok')
//             }
//             else {
//             console.log('tittle required')
//             }


//     } catch (err) {

//         console.log('error in this', err)
//     }

    //throw new Error("Function not implemented.");
//}
