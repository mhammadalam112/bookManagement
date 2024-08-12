import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createBookDto } from './dto/createBook.dto';
import { updateBookDto } from './dto/updateBook.dto';
import { searchBookDto } from './dto/searchBook.dto';
import { Book } from './entity/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book)
        private bookRepository: Repository<Book>,
    ) { }

    async create(book: createBookDto): Promise<Book> {
        return await this.bookRepository.save(book);
    }

    async findAll(): Promise<Book[]> {
        const rows = await this.bookRepository.find();

        if(rows.length < 1){
            throw new HttpException("No books to show",HttpStatus.NOT_FOUND);
        }
        return rows;

    }


    async update(id: number, car: updateBookDto): Promise<any> {
        const rows = await this.bookRepository.update(id, car);

        if(rows.affected == 0){
            throw new HttpException("No book exists with the given id",HttpStatus.NOT_FOUND);
        }

        return rows;
    }

    async delete(id: number): Promise<any> {
        const rows =  await this.bookRepository.delete(id);

        if(rows.affected == 0){
            throw new HttpException("No book exists with the given id",HttpStatus.NOT_FOUND);
        }

        return rows;
    }

    async searchBooks(query : searchBookDto) : Promise<Book[]> {
        const rows = await this.bookRepository.find({
            where: {
              title: query.title ? query.title : undefined,
              author: query.author ? query.author : undefined,
              price: query.price ? query.price : undefined,
              genre: query.genre ? query.genre : undefined,
            },
          });

          if(rows.length < 1){
            throw new HttpException("No book exists with the given criteria",HttpStatus.NOT_FOUND);
        }
        return rows;
    } 
}
