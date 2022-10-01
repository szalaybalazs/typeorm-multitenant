import {MigrationInterface, QueryRunner} from "typeorm";

export class post1664549752906 implements MigrationInterface {
    name = 'post1664549752906'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "${(queryRunner.connection.options as any).schema}"."post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "${(queryRunner.connection.options as any).schema}"."post"`);
    }

}
