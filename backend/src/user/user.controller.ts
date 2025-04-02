import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from '@prisma/client'; // Ensure this import is correct and matches the actual definition of RoleEnum

@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.UserService.create(createUserDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<UserResponseDto> {
    return this.UserService.update(id, updateUserDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.USER) // Use dot notation for TypeScript enums
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
    return { message: 'Xoá người dùng thành công' };
  }
}
