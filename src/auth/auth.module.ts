import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module'; // ✅ Import UsersModule
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard'; // ✅ Import AuthGuard

@Module({
  imports: [
    UsersModule, 
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecretKey', // ถ้าไม่มี JWT_SECRET ให้ใช้ default
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService,AuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
