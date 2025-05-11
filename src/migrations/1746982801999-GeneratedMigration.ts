import { MigrationInterface, QueryRunner } from "typeorm";

export class GeneratedMigration1746982801999 implements MigrationInterface {
    name = 'GeneratedMigration1746982801999'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "angelId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_a0ad1c2a427b5a31d4bc893cdf7" FOREIGN KEY ("angelId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_a0ad1c2a427b5a31d4bc893cdf7"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "angelId"`);
    }

}
