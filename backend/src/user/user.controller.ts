import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserResponseDto } from './dto/user-response.dto';
import { UserUpdateDTO } from './dto/user-update.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from '@prisma/client'; // Ensure this import is correct and matches the actual definition of RoleEnum

@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDTO: UserUpdateDTO
  ): Promise<UserResponseDto> {
    return this.UserService.update(id, updateUserDTO);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.USER)
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    return this.UserService.findOne(id);
  }

  @Get()
  async getAllUsers(): Promise<UserResponseDto[]> {
    return this.UserService.getAll();
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<{ message: string }> {
    await this.UserService.deleteUser(id);
    return { message: 'User deleted successfully' };
  }
}
