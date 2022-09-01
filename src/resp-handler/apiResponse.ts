import {STATUS_CODE} from "./constants"

class ApiResponse {
  statusCode: string;
  error: any;
  result: any;
  time: number;
  
  
  

  constructor(statusCode, result) {
    this.statusCode = statusCode;
    //console.log(">>>>>>>>>> inside API", result)
    if (statusCode == STATUS_CODE.SUCCESS) {
      result ? this.result = result : {};
    }
    else {
      result ? this.error = result : {};
    }
    this.time = new Date().getTime();
  }
}


export default ApiResponse
//module.exports = ApiResponse;