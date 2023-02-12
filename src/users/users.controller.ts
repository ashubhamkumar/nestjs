import { Controller, Get, Post, Body, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  getUser() {
    return this.usersService.getAllUser();
  }

  @Post()
  addNewUser(@Body() body) {
    return this.usersService.createuser(body);
  }

  @Put()
  updateUser(@Body() body: any) {
    return this.usersService.updateUser(body.email, body);
  }
}
