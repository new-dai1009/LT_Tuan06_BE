import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUser1724080153268 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Tạo bảng users
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "username",
                    type: "varchar",
                    isUnique: true,
                },
                {
                    name: "password",
                    type: "varchar",
                },
                {
                    name: "email",
                    type: "varchar",
                    isUnique: true,
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP"
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                    onUpdate: "CURRENT_TIMESTAMP" // Tự động cập nhật khi có sự thay đổi
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Xóa bảng users
        await queryRunner.dropTable("users");
    }
}
