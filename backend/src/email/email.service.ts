import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmailService {
  constructor(
    private mailerService: MailerService,
    private prisma: PrismaService
  ) {}

  private generateOtp(): string {
    return randomInt(100000, 999999).toString();
  }

  private async saveOtp(userId: string, otp: string): Promise<void> {
    const expiredAt = new Date(Date.now() + 5 * 60 * 1000);
    await this.prisma.verification.upsert({
      where: { userId },
      update: { otp, expiredAt },
      create: { userId, otp, expiredAt },
    });
  }

  private async sendOtp(email: string, otp: string): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
    });
  }

  async sendOtpEmail(userId: string, email: string): Promise<void> {
    const otp = this.generateOtp();
    await this.saveOtp(userId, otp);
    await this.sendOtp(email, otp);
  }

  async verifyOtp(userId: string, otp: string): Promise<void> {
    const record = await this.prisma.verification.findUnique({
      where: { userId },
    });

    if (!record) throw new BadRequestException('OTP not found');
    if (record.otp !== otp) throw new BadRequestException('OTP is incorrect');
    if (new Date() > record.expiredAt)
      throw new BadRequestException('OTP has expired');

    await this.prisma.verification.delete({ where: { userId } });
    await this.prisma.user.update({
      where: { id: userId },
      data: { isVerified: true },
    });
  }

  async resendOtpEmail(userId: string, email: string): Promise<void> {
    const existingRecord = await this.prisma.verification.findUnique({
      where: { userId },
    });

    const otp =
      existingRecord && existingRecord.expiredAt > new Date()
        ? existingRecord.otp
        : this.generateOtp();

    await this.saveOtp(userId, otp);
    await this.sendOtpEmail(email, otp);
  }
}
