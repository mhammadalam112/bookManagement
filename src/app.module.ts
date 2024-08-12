import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'database/data-source';



@Module({
  imports: [UserModule, BookModule, AuthModule,  ConfigModule.forRoot({
    isGlobal: true,
  }),
  TypeOrmModule.forRoot(dataSourceOptions),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
