import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableColumn, TableIndex } from "typeorm";

export class CreateAuthor1724418516471 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Tạo bảng author
        await queryRunner.createTable(new Table({
            name: "author",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "name",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "birthdate",
                    type: "date",
                    isNullable: true
                },
                {
                    name: "bio",
                    type: "text",
                    isNullable: true
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "now()"
                }
            ]
        }), true);

        // Thêm cột author_id vào bảng book
        await queryRunner.addColumn("book", new TableColumn({
            name: "author_id",
            type: "int",
            isNullable: true
        }));

        // Tạo khóa ngoại
        await queryRunner.createForeignKey("book", new TableForeignKey({
            columnNames: ["author_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "author",
            onDelete: "SET NULL",
            name: "FK_author_book" // Đặt tên cho khóa ngoại
        }));

        // Tùy chọn: Thêm chỉ mục trên author_id để cải thiện hiệu suất
        await queryRunner.createIndex("book", new TableIndex({
            name: "IDX_author_id",
            columnNames: ["author_id"]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Xóa chỉ mục trên author_id
        await queryRunner.dropIndex("book", "IDX_author_id");

        // Xóa khóa ngoại
        const table = await queryRunner.getTable("book");
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("author_id") !== -1);
        await queryRunner.dropForeignKey("book", foreignKey);

        // Xóa cột author_id khỏi bảng book
        await queryRunner.dropColumn("book", "author_id");

        // Xóa bảng author
        await queryRunner.dropTable("author");
    }
}
