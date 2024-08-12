import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class createBookDto {
    @IsString()
    @IsNotEmpty()
    title: string;
  
    @IsString()
    @IsNotEmpty()
    author: string;

    @IsNotEmpty()
    price: number;
  
    @IsString()
    @IsNotEmpty()
    genre: string;
  
    image: string;

}