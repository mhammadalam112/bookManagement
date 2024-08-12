import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class updateBookDto {
    @IsString()
    @IsOptional()
    title: string;
  
    @IsString()
    @IsOptional()
    author: string;

    @IsOptional()
    price: number;
  
    @IsString()
    @IsOptional()
    genre: string;
  
    image: string;

}