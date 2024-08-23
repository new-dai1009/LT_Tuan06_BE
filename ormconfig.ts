

import { DataSource } from "typeorm"

const AppDataSource = new DataSource({
    type: "mariadb",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123456",
    // entities: [User],
    migrations: ["src/database/migrations/*.ts"],
    database: "book",
})
export default AppDataSource;