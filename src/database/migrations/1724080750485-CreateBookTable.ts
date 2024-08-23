import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableColumn } from "typeorm";

export class CreateBookTable1685123456789 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Tạo bảng books
        await queryRunner.createTable(new Table({
            name: "books",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "title",
                    type: "varchar",
                },
                {
                    name: "author",
                    type: "varchar",
                },
                {
                    name: "publishedYear",
                    type: "int",
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP"
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP"
                },
                {
                    name: "userId",
                    type: "int",
                    isNullable: true
                },
                {
                    name: "authorId",
                    type: "int",
                    isNullable: true
                },
                {
                    name: "categoryId",
                    type: "int",
                    isNullable: true
                }
            ]
        }), true);

        // Tạo khóa ngoại từ userId đến bảng users
        await queryRunner.createForeignKey("books", new TableForeignKey({
            columnNames: ["userId"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE",
            name: "FK_user_books"
        }));

        // Tạo khóa ngoại từ authorId đến bảng author
        await queryRunner.createForeignKey("books", new TableForeignKey({
            columnNames: ["authorId"],
            referencedColumnNames: ["id"],
            referencedTableName: "author",
            onDelete: "SET NULL",
            name: "FK_author_books"
        }));

        // Tạo khóa ngoại từ categoryId đến bảng category
        await queryRunner.createForeignKey("books", new TableForeignKey({
            columnNames: ["categoryId"],
            referencedColumnNames: ["id"],
            referencedTableName: "category",
            onDelete: "SET NULL",
            name: "FK_category_books"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Xóa khóa ngoại từ bảng books
        const table = await queryRunner.getTable("books");

        const userForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("userId") !== -1);
        if (userForeignKey) {
            await queryRunner.dropForeignKey("books", userForeignKey);
        }

        const authorForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("authorId") !== -1);
        if (authorForeignKey) {
            await queryRunner.dropForeignKey("books", authorForeignKey);
        }

        const categoryForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("categoryId") !== -1);
        if (categoryForeignKey) {
            await queryRunner.dropForeignKey("books", categoryForeignKey);
        }

        // Xóa bảng books
        await queryRunner.dropTable("books");
    }
}
