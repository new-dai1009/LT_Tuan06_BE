import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "src/user/user.entity";
import { Book } from "src/books/book.entity";

@Entity("orders")
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    orderDate: Date;

    @Column({ type: "int" })
    quantity: number;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    totalPrice: number;

    @ManyToOne(() => User, user => user.orders, { onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    user: User;

    @ManyToOne(() => Book, book => book.orders, { onDelete: "CASCADE" })
    @JoinColumn({ name: "bookId" })
    book: Book;
}
