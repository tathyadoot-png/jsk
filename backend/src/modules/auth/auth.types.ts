export interface SendOtpDto {
  mobile: string;
}

export interface VerifyOtpDto {
  mobile: string;
  otp: string;
}
