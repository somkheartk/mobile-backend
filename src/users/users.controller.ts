import { Controller, Post, Get, Body, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';  // นำเข้า AuthGuard

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {} // Inject UsersService

  @Get()
  @UseGuards(AuthGuard) // ใช้ AuthGuard ที่นำเข้ามา
  async getUsers(
    @Query('page') page = 1, // ค่าเริ่มต้นหน้าแรก
    @Query('limit') limit = 10, // ค่าเริ่มต้นจำนวน 10 รายการต่อหน้า
  ) {
    const pagination = await this.usersService.getPaginatedUsers(page, limit);
    
    return pagination;
  }

  @Post()
  createUser(@Body() user: { name: string }) {
    return { message: 'User created', user };
  }
}
