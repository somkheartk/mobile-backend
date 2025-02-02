import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';  // นำเข้า AuthGuard จากที่คุณสร้าง
import { JwtModule } from '@nestjs/jwt'; // ✅ เพิ่ม JwtModule

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // ตั้งค่าความลับของ JWT
      signOptions: { expiresIn: '1h' }, // ตั้งค่าการหมดอายุของ token (ตัวอย่าง)
    }),
    ConfigModule.forRoot({
      isGlobal: true, // ทำให้ ConfigModule ใช้ได้ทั่วทั้งแอป
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // ใช้ ConfigModule เพื่อดึง MONGO_URI และ MONGO_DB
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'), // ดึง MONGO_URI จาก .env
        dbName: configService.get<string>('MONGO_DB'), // ดึง MONGO_DB จาก .env
      }),
      inject: [ConfigService], // Inject ConfigService เพื่อให้ดึงค่าจาก .env
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {}
