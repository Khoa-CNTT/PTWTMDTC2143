import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmailService {
  constructor(
    private mailerService: MailerService,
    private prisma: PrismaService
  ) {}

  async sendOtpEmail(userId: string, email: string): Promise<void> {
    const otp = randomInt(100000, 999999).toString();

    // Save OTP to the database with expiration time
    await this.prisma.verification.upsert({
      where: { userId },
      update: {
        otp,
        expiredAt: new Date(Date.now() + 5 * 60 * 1000), // OTP valid for 5 minutes
      },
      create: {
        userId,
        otp,
        expiredAt: new Date(Date.now() + 5 * 60 * 1000),
      },
    });

    // Send OTP email
    await this.mailerService.sendMail({
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
    });
  }

  async verifyOtp(userId: string, otp: string): Promise<boolean> {
    const record = await this.prisma.verification.findUnique({
      where: { userId },
    });

    if (!record || record.otp !== otp || record.expiredAt < new Date()) {
      return false; // OTP is invalid or expired
    }

    // Delete OTP after successful verification
    await this.prisma.verification.delete({
      where: { userId },
    });

    // Set user as verified
    await this.prisma.user.update({
      where: { id: userId },
      data: { isVerified: true },
    });

    return true;
  }

  async resendOtpEmail(userId: string, email: string): Promise<void> {
    const existingRecord = await this.prisma.verification.findUnique({
      where: { userId },
    });

    if (existingRecord && existingRecord.expiredAt > new Date()) {
      // If the OTP is still valid, resend the same OTP
      await this.mailerService.sendMail({
        to: email,
        subject: 'Your OTP Code (Resent)',
        text: `Your OTP code is ${existingRecord.otp}. It will expire in 5 minutes.`,
      });
    } else {
      // If the OTP is expired or doesn't exist, generate a new one
      const otp = randomInt(100000, 999999).toString();

      await this.prisma.verification.upsert({
        where: { userId },
        update: {
          otp,
          expiredAt: new Date(Date.now() + 5 * 60 * 1000), // OTP valid for 5 minutes
        },
        create: {
          userId,
          otp,
          expiredAt: new Date(Date.now() + 5 * 60 * 1000),
        },
      });

      await this.mailerService.sendMail({
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
      });
    }
  }
}
