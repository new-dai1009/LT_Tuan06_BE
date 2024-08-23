import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Book } from "src/books/book.entity";

@Entity('author')
export class Author {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: "text", nullable: true })
    biography: string;

    @OneToMany(() => Book, book => book.author)
    books: Book[];

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at: Date;
}
