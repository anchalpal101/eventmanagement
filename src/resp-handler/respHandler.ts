import ApiResponse from "./apiResponse"
import exception from './customException'
import { STATUS_CODE, ERROR_TYPE, RESPONSE_STATUS } from './constants'

let result;
function sendResponse(res, rslt, statusCode: any = undefined) {
  console.log("sendresponse helllllo",rslt)
  let err = rslt && rslt.error
  if (err) {
switch (err.errType) {
      case ERROR_TYPE.UNAUTHORIZED:
        return res.status(RESPONSE_STATUS.UNAUTHORIZED).send(rslt)
      case ERROR_TYPE.INTERNAL_SERVER_ERROR:
        return res.status(RESPONSE_STATUS.INTERNAL_ERROR).send(rslt)
      case ERROR_TYPE.BAD_REQUEST:
        return res.status(RESPONSE_STATUS.BAD_REQUEST).send(rslt)
      case ERROR_TYPE.NOT_IMPLEMENTED:
        return res.status(RESPONSE_STATUS.NOT_IMPLEMENTED).send(rslt)
      case ERROR_TYPE.ALREADY_EXISTS:
        return res.status(RESPONSE_STATUS.ALREADY_EXISTS).send(rslt)
      case ERROR_TYPE.NOT_ALLOWED:
        return res.status(RESPONSE_STATUS.NOT_ALLOWED).send(rslt)
      case ERROR_TYPE.NOT_FOUND:
        return res.status(RESPONSE_STATUS.NOT_FOUND).send(rslt)
      default:
        return res.status(RESPONSE_STATUS.INTERNAL_ERROR).send(rslt)
    }
  }

  if (statusCode) return res.status(statusCode).send(rslt)
  return res.status(RESPONSE_STATUS.SUCCESS).send(rslt)
}

function sendError(res, err) {
  if (!err?.errType) {
    err = exception.internalServerError
  }
  result = new ApiResponse(STATUS_CODE.ERROR, err)
  sendResponse(res, result)
}



function sendSuccess(res, result, statusCode = RESPONSE_STATUS.SUCCESS) {
  result = new ApiResponse(STATUS_CODE.SUCCESS, result)
  console.log(">>>>>>>>>> sendSuccess", result)
  sendResponse(res, result, statusCode)
}

function sendSuccessWithMsg(res, msg, statusCode = RESPONSE_STATUS.SUCCESS) {
  let rslt = { message: msg }
  let result = new ApiResponse(STATUS_CODE.SUCCESS, rslt)
  sendResponse(res, result, statusCode)
}

export {
  sendResponse,
  sendSuccess,
  sendSuccessWithMsg,
  sendError,
  
}
