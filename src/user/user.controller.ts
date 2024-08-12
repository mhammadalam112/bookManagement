import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './dto/createUser.dto';

@Controller('user')
export class UserController {
    
    constructor(private userService : UserService){}

    @Get()
    getUser() {
        return this.userService.getUser();
    }

    @Post()
    createUser(@Body() body: createUserDto){
        return this.userService.createUser(body);
    }

    @Get(':username')
    getUserByUsername(@Param('username') username: string){
        return this.userService.getUserByUsername(username);
    }
}
