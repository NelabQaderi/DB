import { MigrationInterface, QueryRunner } from "typeorm";

export class InstallmentsEntity1714308278397 implements MigrationInterface {
    name = 'InstallmentsEntity1714308278397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "installments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "student_id" character varying(128) NOT NULL, "class_id" character varying(128) NOT NULL, "installment_type" character varying(128) NOT NULL, "installment_amount" integer NOT NULL, "installment_date" TIMESTAMP DEFAULT now(), "installment_received" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_c74e44aa06bdebef2af0a93da1b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_68aee6be4df0239e5180bdeb44" ON "installments" ("student_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_7f3aa971309e157ba3cda6e74c" ON "installments" ("class_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_7f3aa971309e157ba3cda6e74c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_68aee6be4df0239e5180bdeb44"`);
        await queryRunner.query(`DROP TABLE "installments"`);
    }

}
