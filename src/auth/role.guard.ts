import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserService } from "src/user/user.service";

@Injectable()
export class rolesGuard implements CanActivate{

    constructor(private reflector: Reflector, private userService : UserService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const roles = this.reflector.get<string[]>('roles',context.getHandler());

        console.log("roles",roles);

        const req = context.switchToHttp().getRequest();

        console.log(req.user);

        if(req.user){
            const { username } = req.user;

            console.log(username);

            const user = await this.userService.getUserByUsername(username);

            return roles.includes(user.role);

        }
        
        return false;
    }
    
}