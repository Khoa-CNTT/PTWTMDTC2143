import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send-otp')
  async sendOtp(
    @Body('userId') userId: string,
    @Body('email') email: string
  ): Promise<{ message: string }> {
    await this.emailService.sendOtpEmail(userId, email);
    return { message: 'OTP sent successfully' };
  }

  @Post('verify-otp')
  async verifyOtp(
    @Body('userId') userId: string,
    @Body('otp') otp: string
  ): Promise<{ code: number; message: string }> {
    await this.emailService.verifyOtp(userId, otp);
    return { code: 200, message: 'OTP verified successfully' };
  }

  @Post('resend-otp')
  async resendOtp(
    @Body('userId') userId: string,
    @Body('email') email: string
  ): Promise<{ message: string }> {
    await this.emailService.resendOtpEmail(userId, email);
    return { message: 'OTP resent successfully' };
  }
}
