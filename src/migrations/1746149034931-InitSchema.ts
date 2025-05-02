import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1746149034931 implements MigrationInterface {
    name = 'InitSchema1746149034931'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "event" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar(30) NOT NULL, "description" varchar(100), "angel_id" varchar, "postalCode" varchar(9) NOT NULL, "numberHouse" varchar(8) NOT NULL, "complement" varchar(50))`);
        await queryRunner.query(`CREATE TABLE "presence" ("id" varchar PRIMARY KEY NOT NULL, "present" boolean NOT NULL DEFAULT (0), "date_present" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "user_id" varchar, "event_id" varchar)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(50) NOT NULL, "role" varchar(8) NOT NULL, "email" varchar(50) NOT NULL, "password" varchar(100) NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_event" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar(30) NOT NULL, "description" varchar(100), "angel_id" varchar, "postalCode" varchar(9) NOT NULL, "numberHouse" varchar(8) NOT NULL, "complement" varchar(50), CONSTRAINT "FK_886d3cdb94dd2f2d7578b045101" FOREIGN KEY ("angel_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_event"("id", "title", "description", "angel_id", "postalCode", "numberHouse", "complement") SELECT "id", "title", "description", "angel_id", "postalCode", "numberHouse", "complement" FROM "event"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`ALTER TABLE "temporary_event" RENAME TO "event"`);
        await queryRunner.query(`CREATE TABLE "temporary_presence" ("id" varchar PRIMARY KEY NOT NULL, "present" boolean NOT NULL DEFAULT (0), "date_present" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "user_id" varchar, "event_id" varchar, CONSTRAINT "FK_2d943395d4e633af46c12d58f0f" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_2c1167b3a25816d99b7bb0174f4" FOREIGN KEY ("event_id") REFERENCES "event" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_presence"("id", "present", "date_present", "user_id", "event_id") SELECT "id", "present", "date_present", "user_id", "event_id" FROM "presence"`);
        await queryRunner.query(`DROP TABLE "presence"`);
        await queryRunner.query(`ALTER TABLE "temporary_presence" RENAME TO "presence"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "presence" RENAME TO "temporary_presence"`);
        await queryRunner.query(`CREATE TABLE "presence" ("id" varchar PRIMARY KEY NOT NULL, "present" boolean NOT NULL DEFAULT (0), "date_present" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "user_id" varchar, "event_id" varchar)`);
        await queryRunner.query(`INSERT INTO "presence"("id", "present", "date_present", "user_id", "event_id") SELECT "id", "present", "date_present", "user_id", "event_id" FROM "temporary_presence"`);
        await queryRunner.query(`DROP TABLE "temporary_presence"`);
        await queryRunner.query(`ALTER TABLE "event" RENAME TO "temporary_event"`);
        await queryRunner.query(`CREATE TABLE "event" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar(30) NOT NULL, "description" varchar(100), "angel_id" varchar, "postalCode" varchar(9) NOT NULL, "numberHouse" varchar(8) NOT NULL, "complement" varchar(50))`);
        await queryRunner.query(`INSERT INTO "event"("id", "title", "description", "angel_id", "postalCode", "numberHouse", "complement") SELECT "id", "title", "description", "angel_id", "postalCode", "numberHouse", "complement" FROM "temporary_event"`);
        await queryRunner.query(`DROP TABLE "temporary_event"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "presence"`);
        await queryRunner.query(`DROP TABLE "event"`);
    }

}
