import { Author } from "src/author/author.entity";
import { Category } from "src/category/category.entity";
import { Order } from "src/orders/orders.entity";
import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity,  JoinColumn,  ManyToOne,  OneToMany,  PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('books')

export class Book {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    publishedYear: number;
    
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @ManyToOne(() => User, user => user.books)
    user: User;

    @ManyToOne(() => Author, author => author.books)
    author: Author;

    @ManyToOne(() => Category, category => category.books)
    category: Category;

    @OneToMany(() => Order, order => order.book)
    orders: Order[];
    
  }
