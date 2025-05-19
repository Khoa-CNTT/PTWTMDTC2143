import {
  Body,
  Controller,
  Param,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UserCreateDTO } from 'src/user/dto/user-create.dto';
import { UserResponseDto } from 'src/user/dto/user-response.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}
  @Post('register')
  async create(@Body() userCreateDTO: UserCreateDTO): Promise<UserResponseDto> {
    return this.userService.create(userCreateDTO);
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(body.email, body.password);
    return this.authService.login(user);
  }

  @Post('refresh')
  async refresh(@Body('refresh_token') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

  @Post('logout/:userId')
  async logout(@Param('userId') userId: string) {
    if (!userId) {
      throw new UnauthorizedException('User ID is required');
    }
    return this.authService.logout(userId);
  }
}
