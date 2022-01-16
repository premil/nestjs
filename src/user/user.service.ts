import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from './user.model';

@Injectable()
export class UserService {
  private users: User[] = [];

  insertUser(name: string, email: string, password: string) {
    const userId = Math.random().toString();
    const newUser = new User(userId, name, email, password);
    this.users.push(newUser);
    return userId;
  }

  getAllUsers() {
    return [...this.users];
  }

  getSingleUser(userId: string) {
    const user = this.findUser(userId)[0];
    return { ...user };
  }

  updateUser(userId: string, name: string, email: string, password: string) {
    const [user, index] = this.findUser(userId);
    const updatedUser = { ...user };
    if (name) {
      updatedUser.name = name;
    }
    if (email) {
      updatedUser.email = email;
    }
    if (password) {
      updatedUser.password = password;
    }
    this.users[index] = updatedUser;
  }

  deleteUser(userId: string) {
    const index = this.findUser(userId)[1];
    this.users.splice(index, 1);
  }

  private findUser(id: string): [User, number] {
    const userIndex = this.users.findIndex((prod) => prod.id === id);
    const user = this.users[userIndex];
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return [user, userIndex];
  }
}
