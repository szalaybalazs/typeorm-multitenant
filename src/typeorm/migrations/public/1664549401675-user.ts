import {MigrationInterface, QueryRunner} from "typeorm";

export class user1664549401675 implements MigrationInterface {
    name = 'user1664549401675'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "email" character varying NOT NULL, "temp_email" character varying, "password" character varying NOT NULL, "is_activated" boolean NOT NULL DEFAULT false, "verification_token" character varying, "reset_token" character varying, "reset_token_expiry" TIMESTAMP, "scopes" character varying array NOT NULL DEFAULT '{}', "communication_preferences" character varying array, "is_ready" boolean NOT NULL DEFAULT false, "is_ready_confirmed" boolean NOT NULL DEFAULT false, "is_over_eighteen" boolean NOT NULL DEFAULT false, "is_mainland_uk" boolean NOT NULL DEFAULT false, "deleted_at" TIMESTAMP, "is_deleted" boolean NOT NULL DEFAULT false, "agreed_to_terms" boolean NOT NULL DEFAULT false, "is_locked" boolean NOT NULL DEFAULT false, "registered_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_deacd40e96adc7b3cd69338952f" UNIQUE ("temp_email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
