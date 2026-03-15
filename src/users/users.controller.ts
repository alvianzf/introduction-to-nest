import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse as SwaggerResponse, ApiTags } from '@nestjs/swagger';
import type { ApiResponse } from '../types/api-response.interface';
import { SafeUserDto } from './dto/create-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @SwaggerResponse({ status: 201, description: 'User created.' })
  create(@Body() createUserDto: CreateUserDto): ApiResponse<SafeUserDto> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @SwaggerResponse({ status: 200, description: 'List of all users.' })
  findAll(): ApiResponse<SafeUserDto[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single user' })
  @SwaggerResponse({ status: 200, description: 'User found.' })
  findOne(@Param('id') id: string): ApiResponse<SafeUserDto> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user' })
  @SwaggerResponse({ status: 200, description: 'User updated.' })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): ApiResponse<SafeUserDto> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @SwaggerResponse({ status: 200, description: 'User deleted.' })
  remove(@Param('id') id: string): ApiResponse<null> {
    return this.usersService.remove(id);
  }
}
