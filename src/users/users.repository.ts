import { Injectable } from '@nestjs/common';
import { User } from '../types/user.type';
import { usersMock } from './data/users.mock';

@Injectable()
export class UserRepository {
  private users: User[] = usersMock;

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User | undefined {
    return this.users.find((u) => u.id === id);
  }

  create(user: User): User {
    this.users.push(user);
    return user;
  }

  update(id: string, updates: Partial<User>): User | undefined {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return undefined;
    this.users[index] = { ...this.users[index], ...updates };
    return this.users[index];
  }

  remove(id: string): boolean {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return false;
    this.users.splice(index, 1);
    return true;
  }
}
