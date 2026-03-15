import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { CreateUserDto, SafeUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

interface User {
  id: number;
  username: string;
  email: string;
  password?: string;
  name?: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [];

  create(createUserDto: CreateUserDto): SafeUserDto {
    const newUser = {
      id: this.users.length + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    const { password: _, ...safeUser } = newUser;
    return safeUser;
  }

  findAll(): SafeUserDto[] {
    return this.users.map(({ password: _, ...safeUser }) => safeUser);
  }

  findOne(id: number): SafeUserDto {
    const user = this.users.find((u) => u.id === id);
    if (!user) return null;
    const { password: _, ...safeUser } = user;
    return safeUser;
  }

  update(id: number, updateUserDto: UpdateUserDto): SafeUserDto {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return null;
    this.users[index] = { ...this.users[index], ...updateUserDto };
    const { password: _, ...safeUser } = this.users[index];
    return safeUser;
  }

  remove(id: number) {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return null;
    const removed = this.users.splice(index, 1);
    return removed[0];
  }
}

