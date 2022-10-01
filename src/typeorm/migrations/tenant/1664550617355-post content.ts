import {MigrationInterface, QueryRunner} from "typeorm";

export class postContent1664550617355 implements MigrationInterface {
    name = 'postContent1664550617355'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "${(queryRunner.connection.options as any).schema}"."post" ADD "author_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "${(queryRunner.connection.options as any).schema}"."post" ADD "content" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "${(queryRunner.connection.options as any).schema}"."post" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "${(queryRunner.connection.options as any).schema}"."post" DROP COLUMN "author_id"`);
    }

}
