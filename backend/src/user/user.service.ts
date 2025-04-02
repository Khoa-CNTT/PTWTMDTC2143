import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/auth/interfaces/user.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleEnum } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    await this.checkEmailExitsts(createUserDto.email);
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: hashedPassword,
        name: createUserDto.name,
        phone: createUserDto.phone,
        roles: {
          create: {
            role: {
              create: {
                name: RoleEnum.USER,
              },
            },
          },
        },
      },
      include: {
        roles: {
          select: {
            role: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    // Send OTP email after user creation
    await this.emailService.sendOtpEmail(user.id, createUserDto.email);

    const mappedUser: User = {
      ...user,
      roles: user.roles.map((roleItem) => ({
        name: roleItem.role.name,
      })),
    };

    return this.mapToUserResponseDto(mappedUser);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto
  ): Promise<UserResponseDto> {
    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      include: {
        roles: {
          select: {
            role: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    const mappedUser: User = {
      ...user,
      roles: user.roles.map((roleItem) => ({
        name: roleItem.role.name,
      })),
    };

    return this.mapToUserResponseDto(mappedUser);
  }

  async deleteUser(id: string): Promise<{ message: string }> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('Người dùng không tồn tại');
    }

    await this.prisma.user.delete({ where: { id } });
    return { message: 'Người dùng đã bị xóa' };
  }

  async getAll(): Promise<UserResponseDto[]> {
    const users = await this.prisma.user.findMany({
      include: {
        roles: {
          select: {
            role: { select: { name: true } },
          },
        },
      },
    });

    return users.map((user) => ({
      ...user,
      roles: user.roles.map((roleItem) => ({ name: roleItem.role.name })),
    }));
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        roles: {
          select: {
            role: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    const mappedUser: User = {
      ...user,
      roles: user.roles.map((roleItem) => ({
        name: roleItem.role.name,
      })),
    };

    return this.mapToUserResponseDto(mappedUser);
  }

  async verifyUserOtp(userId: string, otp: string): Promise<boolean> {
    const verified = await this.emailService.verifyOtp(userId, otp);
    if (verified) {
      await this.prisma.user.update({
        where: { id: userId },
        data: { isVerified: true },
      });
    }
    return verified;
  }

  private async checkEmailExitsts(email: string): Promise<void> {
    const exitstingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (exitstingUser) {
      throw new ConflictException('Email này đã được đăng ký');
    }
  }

  private mapToUserResponseDto(user: User): UserResponseDto {
    const result = { ...user };
    delete result.password;
    return result;
  }
}
