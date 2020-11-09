import { MigrationInterface, QueryRunner } from 'typeorm'

export class First1604668179083 implements MigrationInterface {
    name = 'First1604668179083'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "course" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "enabled" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TABLE "group" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "enabled" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "date_birth" TIMESTAMP NOT NULL, "enabled" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "groupId" uuid NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_974590e8d8d4ceb64e30c38e05" UNIQUE ("groupId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TABLE "session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "enabled" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "courseId" uuid NOT NULL, CONSTRAINT "REL_2440b236e81d633ff0613ae59d" UNIQUE ("courseId"), CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TABLE "lesson" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "url" character varying NOT NULL, "duration" integer NOT NULL, "status" integer NOT NULL, "enabled" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "sessionId" uuid NOT NULL, CONSTRAINT "REL_ac7f90322d2d395243ffc6d925" UNIQUE ("sessionId"), CONSTRAINT "PK_0ef25918f0237e68696dee455bd" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `ALTER TABLE "user" ADD CONSTRAINT "FK_974590e8d8d4ceb64e30c38e051" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "session" ADD CONSTRAINT "FK_2440b236e81d633ff0613ae59d4" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "lesson" ADD CONSTRAINT "FK_ac7f90322d2d395243ffc6d9250" FOREIGN KEY ("sessionId") REFERENCES "session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "lesson" DROP CONSTRAINT "FK_ac7f90322d2d395243ffc6d9250"`,
        )
        await queryRunner.query(
            `ALTER TABLE "session" DROP CONSTRAINT "FK_2440b236e81d633ff0613ae59d4"`,
        )
        await queryRunner.query(
            `ALTER TABLE "user" DROP CONSTRAINT "FK_974590e8d8d4ceb64e30c38e051"`,
        )
        await queryRunner.query(`DROP TABLE "lesson"`)
        await queryRunner.query(`DROP TABLE "session"`)
        await queryRunner.query(`DROP TABLE "user"`)
        await queryRunner.query(`DROP TABLE "group"`)
        await queryRunner.query(`DROP TABLE "course"`)
    }
}
