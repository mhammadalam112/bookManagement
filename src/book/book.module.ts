import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entity/book.entity';
import { UserModule } from 'src/user/user.module';
import { FileUploadMiddleware } from 'src/common/middleware/file-upload.middleware';

@Module({
  controllers: [BookController],
  providers: [BookService],
  imports: [TypeOrmModule.forFeature([Book]), UserModule],
})

export class BookModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(FileUploadMiddleware)
      .forRoutes({ path: 'book', method: RequestMethod.POST },{ path: 'book/:id', method: RequestMethod.PATCH });
  }}
