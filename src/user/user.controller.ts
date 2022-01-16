import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  addUser(
    @Body('name') userName: string,
    @Body('email') userEmail: string,
    @Body('password') userPassword: string,
  ) {
    const generatedId = this.userService.insertUser(
      userName,
      userEmail,
      userPassword,
    );
    return { id: generatedId };
  }

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getSingleUser(@Param('id') userId: string) {
    return this.userService.getSingleUser(userId);
  }

  @Patch(':id')
  updateUser(
    @Param('id') userId: string,
    @Body('name') userName: string,
    @Body('email') userEmail: string,
    @Body('password') userPassword: string,
  ) {
    this.userService.updateUser(userId, userName, userEmail, userPassword);
    return null;
  }

  @Delete(':id')
  removeUser(@Param('id') userId: string) {
    this.userService.deleteUser(userId);
    return null;
  }
}
