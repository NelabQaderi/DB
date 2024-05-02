import { MigrationInterface, QueryRunner } from "typeorm";

export class InstructorsEntity1714288723703 implements MigrationInterface {
    name = 'InstructorsEntity1714288723703'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "instructors" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(256) NOT NULL, "fathername" character varying(256) NOT NULL, "phone_number" character varying(128) NOT NULL, "email" character varying(128) NOT NULL, "percentage" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_95e3da69ca76176ea4ab8435098" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9bba3ed4e09b1b65c0e9e9bad1" ON "instructors" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_005424bbf68f407720a34272fd" ON "instructors" ("fathername") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_005424bbf68f407720a34272fd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9bba3ed4e09b1b65c0e9e9bad1"`);
        await queryRunner.query(`DROP TABLE "instructors"`);
    }

}
