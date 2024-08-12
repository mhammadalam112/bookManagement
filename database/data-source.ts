import { User } from "src/user/entity/user.entity";
import { DataSource, DataSourceOptions } from "typeorm";
import 'dotenv/config';
import { Book } from "src/book/entity/book.entity";


export const dataSourceOptions : DataSourceOptions = {
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
    entities: [User,Book],
    migrations: ['dist/database/migrations/*.js']
}

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;