import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
      ) {}

    async getUser() :  Promise<User[]> {
        const rows = await this.usersRepository.find();

        if(rows.length < 1){
            throw new HttpException("No users to show",HttpStatus.NOT_FOUND);
        }
        return rows;
    }

    async createUser(body: createUserDto) :  Promise<User> {
        body.password = await bcrypt.hash(body.password, 10);
        return await this.usersRepository.save(body);
    }



    async getUserByUsername(username: string) : Promise<User>{
        console.log("inside getUserByUsername username: ",username);
        
        //return await this.usersRepository.findOne({ where: {username : username} });

        const rows = await this.usersRepository.findOneBy({ username : username });

        if(rows == null || undefined){
            throw new HttpException("No user exists with the given username",HttpStatus.NOT_FOUND);
        }
        return rows;
    }
}
