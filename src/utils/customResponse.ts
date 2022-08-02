import { ApiResponse } from "../interfaces";

const customResponse = (status: ApiResponse['status'], message: ApiResponse['message'], data: ApiResponse['data']) => {
  return { status, message, data }
}

export default customResponse;