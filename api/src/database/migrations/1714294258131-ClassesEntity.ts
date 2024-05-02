import { MigrationInterface, QueryRunner } from "typeorm";

export class ClassesEntity1714294258131 implements MigrationInterface {
    name = 'ClassesEntity1714294258131'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "classes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "class_name" character varying(256) NOT NULL, "instructor_id" character varying(256) NOT NULL, "class_duration" integer NOT NULL, "start_date" date NOT NULL, "start_time" character varying(256) NOT NULL, "class_fee" integer NOT NULL, "class_fee_currency" character varying(256) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_e207aa15404e9b2ce35910f9f7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_18aa29085d3e7de52c53690fe9" ON "classes" ("class_name") `);
        await queryRunner.query(`CREATE INDEX "IDX_d454f4606fdd87bc6267683b8b" ON "classes" ("instructor_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_d454f4606fdd87bc6267683b8b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_18aa29085d3e7de52c53690fe9"`);
        await queryRunner.query(`DROP TABLE "classes"`);
    }

}
