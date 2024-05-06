import { MigrationInterface, QueryRunner } from "typeorm";

export class StudentsEntity1714295122607 implements MigrationInterface {
    name = 'StudentsEntity1714295122607'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "students" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "student_name" character varying(256) NOT NULL, "student_fathername" character varying(256) NOT NULL, "student_phone_number" character varying(256) NOT NULL, "student_address" character varying(256), "student_photo" character varying(256) NOT NULL, "student_registeration_date" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_98855132d71d4101fec1b819b8" ON "students" ("student_name") `);
        await queryRunner.query(`CREATE INDEX "IDX_2c98fa0072e01b5a3c52cc5081" ON "students" ("student_fathername") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_2c98fa0072e01b5a3c52cc5081"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_98855132d71d4101fec1b819b8"`);
        await queryRunner.query(`DROP TABLE "students"`);
    }

}
