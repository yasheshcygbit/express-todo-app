export interface ApiResponse {
  status: 'ERROR' | 'SUCCESS',
  message: string,
  data: any
}