import { User } from 'src/user/entity/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  price: number;

  @Column()
  genre: string;

  @Column({ default: 'no Image' })
  image: string;

  @ManyToMany(() => User, user => user.books)
  users: User[];
}