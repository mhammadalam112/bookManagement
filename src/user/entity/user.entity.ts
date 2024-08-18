import { Book } from "src/book/entity/book.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique: true })
    username: string;
  
    @Column()
    password: string;
  
    @Column()
    role: string; 

    @ManyToMany(() => Book, book => book.users,  { eager: true }) 
    @JoinTable() 
    books: Book[];
}