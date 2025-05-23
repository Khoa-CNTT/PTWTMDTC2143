import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  UseGuards,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  async getAllUsers(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('cursor') cursor?: string
  ): Promise<{
    users: UserResponseDto[];
    total: number;
    nextCursor: string | null;
  }> {
    return this.UserService.getAll(limit, cursor);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  async deleteUser(@Param('id') id: string): Promise<{ message: string }> {
    await this.UserService.deleteUser(id);
    return { message: 'User deleted successfully' };
  }
}
