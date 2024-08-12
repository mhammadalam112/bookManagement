import { Type } from "class-transformer";
import {  IsInt, IsOptional, IsString } from "class-validator";

export class searchBookDto {
    @IsOptional()
    @IsString()
    title?: string;
  
    @IsOptional()
    @IsString()
    author?: string;
  
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    price?: number;
  
    @IsOptional()
    @IsString()
    genre?: string;
}