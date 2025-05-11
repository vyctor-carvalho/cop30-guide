import { MigrationInterface, QueryRunner } from "typeorm";

export class GeneratedMigration1746979925898 implements MigrationInterface {
    name = 'GeneratedMigration1746979925898'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(30) NOT NULL, "description" character varying(100), "angel_id" uuid, "postalCode" character varying(9) NOT NULL, "numberHouse" character varying(8) NOT NULL, "complement" character varying(50), CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "presence" ("user_id" uuid NOT NULL, "event_id" uuid NOT NULL, "present" boolean NOT NULL DEFAULT false, "date_present" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_194496cb41a3eb4f3ea5850506b" PRIMARY KEY ("user_id", "event_id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "role" character varying(8) NOT NULL DEFAULT 'visitor', "email" character varying(50) NOT NULL, "password" character varying(100) NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_886d3cdb94dd2f2d7578b045101" FOREIGN KEY ("angel_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "presence" ADD CONSTRAINT "FK_2d943395d4e633af46c12d58f0f" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "presence" ADD CONSTRAINT "FK_2c1167b3a25816d99b7bb0174f4" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "presence" DROP CONSTRAINT "FK_2c1167b3a25816d99b7bb0174f4"`);
        await queryRunner.query(`ALTER TABLE "presence" DROP CONSTRAINT "FK_2d943395d4e633af46c12d58f0f"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_886d3cdb94dd2f2d7578b045101"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "presence"`);
        await queryRunner.query(`DROP TABLE "event"`);
    }

}
