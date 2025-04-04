import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from './interfaces/user.interface';
import { Payload } from './interfaces/payload.interface';
import { Prisma, RefreshToken } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.getUserByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }

    return this.mapUser(user);
  }

  async login(user: User): Promise<{
    access_token: string;
    refresh_token: string;
    access_token_expires_in: number;
    refresh_token_expires_in: number;
  }> {
    const {
      accessToken,
      refreshToken,
      accessTokenExpiresIn,
      refreshTokenExpiresIn,
    } = await this.generateTokens(user);

    await this.saveOrUpdateRefreshToken(user.id, refreshToken);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      access_token_expires_in: accessTokenExpiresIn,
      refresh_token_expires_in: refreshTokenExpiresIn,
    };
  }

  async refreshToken(
    refresh_token: string
  ): Promise<{ access_token: string; access_token_expires_in: number }> {
    const decoded = await this.verifyRefreshToken(refresh_token);

    const newAccessToken = await this.jwtService.signAsync(
      { id: decoded.id, name: decoded.name, roles: decoded.roles },
      { expiresIn: '15m' }
    );

    return {
      access_token: newAccessToken,
      access_token_expires_in: 15 * 60,
    };
  }

  async logout(userId: string): Promise<{ code: number; message: string }> {
    await this.prisma.refreshToken.delete({ where: { userId } });
    return { code: 1000, message: 'Đăng xuất thành công' };
  }

  private async getUserByEmail(email: string): Promise<
    Prisma.UserGetPayload<{
      include: { roles: { select: { role: { select: { name: true } } } } };
    }>
  > {
    return this.prisma.user.findUnique({
      where: { email },
      include: { roles: { select: { role: { select: { name: true } } } } },
    });
  }

  private mapUser(
    user: Prisma.UserGetPayload<{
      include: { roles: { select: { role: { select: { name: true } } } } };
    }>
  ): User {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password,
      roles: user.roles.map((roleItem) => ({
        name: roleItem.role.name,
      })),
      isVerified: user.isVerified,
    };
  }

  private async generateTokens(user: User): Promise<{
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresIn: number;
    refreshTokenExpiresIn: number;
  }> {
    const payload: Payload = {
      id: user.id,
      name: user.name,
      roles: user.roles.map((role) => role.name),
    };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '15m',
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      }),
      accessTokenExpiresIn: 15 * 60,
      refreshTokenExpiresIn: 7 * 24 * 60 * 60,
    };
  }

  private async saveOrUpdateRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<RefreshToken> {
    return this.prisma.refreshToken.upsert({
      where: { userId },
      update: {
        token: refreshToken,
        expiredAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
      create: {
        token: refreshToken,
        userId,
        expiredAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });
  }

  private async verifyRefreshToken(
    refresh_token: string
  ): Promise<{ id: string; name: string; roles: string[] }> {
    const decoded: { id: string; name: string; roles: string[] } =
      await this.jwtService.verifyAsync(refresh_token);

    const refreshTokenRecord = await this.prisma.refreshToken.findUnique({
      where: { userId: decoded.id },
    });

    if (!refreshTokenRecord || refreshTokenRecord.expiredAt < new Date()) {
      throw new UnauthorizedException('Refresh token is invalid or expired');
    }

    return decoded;
  }
}
