import { Controller, Post, Body, HttpCode, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService, // Inject AuthService
  ) {}

  @Post('login')
  @HttpCode(200) // กำหนดให้ส่งสถานะ 200
  async login(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    try {
      const result = await this.authService.login(username, password); // ส่งไปยัง authService.login()
      return result; // ส่งผลลัพธ์จากการ login
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        // จัดการข้อผิดพลาดกรณีที่ไม่พบผู้ใช้หรือรหัสผ่านผิด
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED); // สร้างข้อผิดพลาด Unauthorized
      } else {
        // จัดการข้อผิดพลาดอื่น ๆ
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR); // ข้อผิดพลาดภายใน
      }
    }
  }
}
