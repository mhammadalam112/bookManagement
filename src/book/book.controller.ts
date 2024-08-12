import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { createBookDto } from './dto/createBook.dto';
import { searchBookDto } from './dto/searchBook.dto';
import { updateBookDto } from './dto/updateBook.dto';
import { rolesGuard } from 'src/auth/role.guard';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/role.decorator';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('book')
export class BookController {

    constructor(private readonly bookService: BookService) { }

    
    @Post()
    @UseGuards(rolesGuard)
    @Roles(Role.Admin)
    create(@Body() book: createBookDto) {
        console.log("book: "+JSON.stringify(book));
        return this.bookService.create(book);
    }

    @UseGuards(rolesGuard)
    @Roles(Role.Member)
    @Get()
    findAll() {
        return this.bookService.findAll();
    }

    @UseGuards(rolesGuard)
    @Roles(Role.Member)
    @Get('search')
    searchCars(@Query() query: searchBookDto) {
        console.log(query);
        return this.bookService.searchBooks(query);
    }

    @UseGuards(rolesGuard)
    @Roles(Role.Admin)
    @Patch(':id')
    update(@Body() book: updateBookDto, @Param('id') id: number, ) {
        return this.bookService.update(id, book);
    }

    @Delete(':id')
    @UseGuards(rolesGuard)
    @Roles(Role.Admin)
    delete(@Param('id') id: number) {
        return this.bookService.delete(id);
    }

}
