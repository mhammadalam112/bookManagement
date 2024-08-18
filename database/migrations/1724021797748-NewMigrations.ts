import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigrations1724021797748 implements MigrationInterface {
    name = 'NewMigrations1724021797748'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`book\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`author\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`genre\` varchar(255) NOT NULL, \`image\` varchar(255) NOT NULL DEFAULT 'no Image', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_books_book\` (\`userId\` int NOT NULL, \`bookId\` int NOT NULL, INDEX \`IDX_ad4911225f9d075e7af4dc2ced\` (\`userId\`), INDEX \`IDX_17480627c54e46bc745098954e\` (\`bookId\`), PRIMARY KEY (\`userId\`, \`bookId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_books_book\` ADD CONSTRAINT \`FK_ad4911225f9d075e7af4dc2cede\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_books_book\` ADD CONSTRAINT \`FK_17480627c54e46bc745098954e3\` FOREIGN KEY (\`bookId\`) REFERENCES \`book\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_books_book\` DROP FOREIGN KEY \`FK_17480627c54e46bc745098954e3\``);
        await queryRunner.query(`ALTER TABLE \`user_books_book\` DROP FOREIGN KEY \`FK_ad4911225f9d075e7af4dc2cede\``);
        await queryRunner.query(`DROP INDEX \`IDX_17480627c54e46bc745098954e\` ON \`user_books_book\``);
        await queryRunner.query(`DROP INDEX \`IDX_ad4911225f9d075e7af4dc2ced\` ON \`user_books_book\``);
        await queryRunner.query(`DROP TABLE \`user_books_book\``);
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`book\``);
    }

}
