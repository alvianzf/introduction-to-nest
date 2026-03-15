import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { CreateUserDto, SafeUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../types/user.type';
import { ApiResponse } from '../types/api-response.interface';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  create(createUserDto: CreateUserDto): ApiResponse<SafeUserDto> {
    const users = this.userRepository.findAll();
    const newUser: User = {
      id: (users.length + 1).toString(),
      ...createUserDto,
    };
    const user = this.userRepository.create(newUser);
    const safeUser: SafeUserDto = {
      username: user.username,
      email: user.email,
      name: user.name,
    };
    return {
      status: 201,
      message: 'User created',
      data: safeUser,
    };
  }

  findAll(): ApiResponse<SafeUserDto[]> {
    const users = this.userRepository.findAll();
    const safeUsers: SafeUserDto[] = users.map((user) => ({
      username: user.username,
      email: user.email,
      name: user.name,
    }));
    return {
      status: 200,
      message: 'List of all users',
      data: safeUsers,
    };
  }

  findOne(id: string): ApiResponse<SafeUserDto> {
    const user = this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    const safeUser: SafeUserDto = {
      username: user.username,
      email: user.email,
      name: user.name,
    };
    return {
      status: 200,
      message: 'User found',
      data: safeUser,
    };
  }

  update(id: string, updateUserDto: UpdateUserDto): ApiResponse<SafeUserDto> {
    const user = this.userRepository.update(id, updateUserDto);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    const safeUser: SafeUserDto = {
      username: user.username,
      email: user.email,
      name: user.name,
    };
    return {
      status: 200,
      message: 'User updated',
      data: safeUser,
    };
  }

  remove(id: string): ApiResponse<null> {
    const deleted = this.userRepository.remove(id);
    if (!deleted) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return {
      status: 200,
      message: 'User deleted',
    };
  }
}
