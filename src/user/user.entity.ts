import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Book } from "src/books/book.entity";
import { Order } from "src/orders/orders.entity";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column({ unique: true })
    email: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @OneToMany(() => Book, book => book.user)
    books: Book[];
    
    @OneToMany(() => Order, order => order.user)
    orders: Order[];
}
