import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { CreateUserDto, SafeUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../types/user.type';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  create(createUserDto: CreateUserDto) {
    const newUser: User = {
      id: (this.userRepository.findAll().length + 1).toString(),
      ...createUserDto,
    };
    const user = this.userRepository.create(newUser);
    const { password: _, ...safeUser } = user;
    return {
      message: 'User created',
      data: safeUser,
    };
  }

  findAll() {
    const users = this.userRepository.findAll();
    const safeUsers = users.map(({ password: _, ...safeUser }) => safeUser);
    return {
      message: 'List of all users',
      data: safeUsers,
    };
  }

  findOne(id: string) {
    const user = this.userRepository.findOne(id);
    if (!user) {
      return {
        message: 'User not found',
      };
    }
    const { password: _, ...safeUser } = user;
    return {
      message: 'User found',
      data: safeUser,
    };
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.userRepository.update(id, updateUserDto);
    if (!user) {
      return {
        message: 'User not found',
      };
    }
    const { password: _, ...safeUser } = user;
    return {
      message: 'User updated',
      data: safeUser,
    };
  }

  remove(id: string) {
    const deleted = this.userRepository.remove(id);
    if (!deleted) {
      return {
        message: 'User not found',
      };
    }
    return {
      message: 'User deleted',
    };
  }
}
