import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { createBookDto } from './dto/createBook.dto';
import { searchBookDto } from './dto/searchBook.dto';
import { updateBookDto } from './dto/updateBook.dto';
import { rolesGuard } from 'src/auth/role.guard';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/role.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';

@UseGuards(AuthGuard('jwt'))
@Controller('book')
export class BookController {

    constructor(private bookService: BookService, private userService: UserService) { }


    @Post()
    @UseGuards(rolesGuard)
    @Roles(Role.Admin)
    create(@Body() book: createBookDto) {
        console.log("book: " + JSON.stringify(book));
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
    update(@Body() book: updateBookDto, @Param('id') id: number,) {
        return this.bookService.update(id, book);
    }

    @Delete(':id')
    @UseGuards(rolesGuard)
    @Roles(Role.Admin)
    delete(@Param('id') id: number) {
        return this.bookService.delete(id);
    }

    @Post('buy/:id')
    @UseGuards(rolesGuard)
    @Roles(Role.Member) 
    async buyBook(@Param('id') bookId: number, @Req() req: any) {
        const username = req.user.username; 
        const user = await this.userService.getUserByUsername(username);

        const book = await this.bookService.findOne(bookId);
        console.log(book);
        console.log(user);
        if (!user.books) {
            user.books = [];
        }
        user.books.push(book);
        await this.userService.buyBooks(user.id, user.books);

        return {
            message: `Successfully bought '${book.title}' `,
        };
    }

}
