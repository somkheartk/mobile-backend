import { Injectable, UnauthorizedException } from '@nestjs/common'; // ✅ Import UnauthorizedException
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // ฟังก์ชัน login ที่รับ username และ password
  async login(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);
    // ✅ ตรวจสอบว่า user ไม่เป็น undefined และเปรียบเทียบ password
    if (user && user.password === password) {  // แก้ไขการเปรียบเทียบ

      const { password, ...result } = user.toObject();
      const payload = { username: result.username, sub: result._id };
      return {
        access_token: this.jwtService.sign(payload, { 
          secret: process.env.JWT_SECRET || 'defaultSecretKey', // ระบุ secret ในการสร้าง JWT token
          expiresIn: process.env.JWT_EXPIRE , // กำหนดเวลา expiration (ตามที่ต้องการ)
        }),
        user: result,  // ส่งข้อมูลผู้ใช้ที่ไม่มี password
        statusCode: 200,
      };
    } else {
      throw new UnauthorizedException('Invalid credentials'); // ใช้ UnauthorizedException
    }
  }
}
