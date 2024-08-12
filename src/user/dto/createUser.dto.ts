import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class createUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;
  
    @IsString()
    @IsNotEmpty()
    password: string;
  
    @IsString()
    @IsNotEmpty()
    role: string;
}