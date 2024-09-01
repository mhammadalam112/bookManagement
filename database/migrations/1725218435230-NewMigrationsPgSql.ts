import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigrationsPgSql1725218435230 implements MigrationInterface {
    name = 'NewMigrationsPgSql1725218435230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "book" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "author" character varying NOT NULL, "price" integer NOT NULL, "genre" character varying NOT NULL, "image" character varying NOT NULL DEFAULT 'no Image', CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_books_book" ("userId" integer NOT NULL, "bookId" integer NOT NULL, CONSTRAINT "PK_baef78b64f8672af581fb995802" PRIMARY KEY ("userId", "bookId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ad4911225f9d075e7af4dc2ced" ON "user_books_book" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_17480627c54e46bc745098954e" ON "user_books_book" ("bookId") `);
        await queryRunner.query(`ALTER TABLE "user_books_book" ADD CONSTRAINT "FK_ad4911225f9d075e7af4dc2cede" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_books_book" ADD CONSTRAINT "FK_17480627c54e46bc745098954e3" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_books_book" DROP CONSTRAINT "FK_17480627c54e46bc745098954e3"`);
        await queryRunner.query(`ALTER TABLE "user_books_book" DROP CONSTRAINT "FK_ad4911225f9d075e7af4dc2cede"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_17480627c54e46bc745098954e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ad4911225f9d075e7af4dc2ced"`);
        await queryRunner.query(`DROP TABLE "user_books_book"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "book"`);
    }

}
