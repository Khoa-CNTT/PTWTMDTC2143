import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserCreateDTO } from './dto/user-create.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/auth/interfaces/user.interface';
import { UserUpdateDTO } from './dto/user-update.dto';
import { RoleEnum } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService
  ) {}

  async create(userCreateDTO: UserCreateDTO): Promise<UserResponseDto> {
    await this.checkEmailExitsts(userCreateDTO.email);

    const hashedPassword = await bcrypt.hash(userCreateDTO.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: userCreateDTO.email,
        password: hashedPassword,
        name: userCreateDTO.name,
        phone: userCreateDTO.phone,
        isVerified: false,
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

    await this.emailService.sendOtpEmail(user.id, userCreateDTO.email);

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
    userUpdateDTO: UserUpdateDTO
  ): Promise<UserResponseDto> {
    const user = await this.prisma.user.update({
      where: { id },
      data: userUpdateDTO,
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

  private async checkEmailExitsts(email: string): Promise<void> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      if (!existingUser.isVerified) {
        await this.emailService.sendOtpEmail(existingUser.id, email);
        throw new BadRequestException('Email not verified. OTP resent!');
      }
      throw new BadRequestException('Email already in use!');
    }
  }

  private mapToUserResponseDto(user: User): UserResponseDto {
    const result = { ...user };
    delete result.password;
    return result;
  }
}
