import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule globally available
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Use ConfigModule to fetch the MONGO_URI and MONGO_DB
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'), // Fetch MONGO_URI from .env
        dbName: configService.get<string>('MONGO_DB'), // Fetch MONGO_DB from .env
      }),
      inject: [ConfigService], // Inject ConfigService
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
