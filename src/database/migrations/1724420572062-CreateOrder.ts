import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateOrderTable1685123456789 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Tạo bảng orders
        await queryRunner.createTable(new Table({
            name: "orders",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "orderDate",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP"
                },
                {
                    name: "quantity",
                    type: "int",
                },
                {
                    name: "totalPrice",
                    type: "decimal",
                    precision: 10,
                    scale: 2
                },
                {
                    name: "userId",
                    type: "int",
                },
                {
                    name: "bookId",
                    type: "int",
                }
            ]
        }), true);

        // Tạo khóa ngoại từ userId đến bảng users
        await queryRunner.createForeignKey("orders", new TableForeignKey({
            columnNames: ["userId"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE",
            name: "FK_user_orders"
        }));

        // Tạo khóa ngoại từ bookId đến bảng books
        await queryRunner.createForeignKey("orders", new TableForeignKey({
            columnNames: ["bookId"],
            referencedColumnNames: ["id"],
            referencedTableName: "books",
            onDelete: "CASCADE",
            name: "FK_book_orders"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Xóa khóa ngoại từ bảng orders
        const table = await queryRunner.getTable("orders");

        const userForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("userId") !== -1);
        if (userForeignKey) {
            await queryRunner.dropForeignKey("orders", userForeignKey);
        }

        const bookForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("bookId") !== -1);
        if (bookForeignKey) {
            await queryRunner.dropForeignKey("orders", bookForeignKey);
        }

        // Xóa bảng orders
        await queryRunner.dropTable("orders");
    }
}
