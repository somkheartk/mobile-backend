import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose'; 
import { JwtModule } from '@nestjs/jwt'; // ✅ นำเข้า JwtModule

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET, // ตั้งค่าความลับของ JWT
      signOptions: { expiresIn: '1h' }, // ตั้งค่าการหมดอายุของ token
    }),
],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // ✅ ต้อง export ด้วย
})
export class UsersModule {}
