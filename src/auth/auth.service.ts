import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor( private userService: UserService, private jwtService: JwtService){}

    async validateUser(username: string, password: string){
        const user = await this.userService.getUserByUsername(username);

        if(user && await bcrypt.compare(password, user.password)){
            return user
        }

        return null
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }

}
