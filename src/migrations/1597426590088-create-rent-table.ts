import {MigrationInterface, QueryRunner} from "typeorm";

export class createRentTable1597426590088 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "rent" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "price" integer NOT NULL, "interval" integer NOT NULL, "next_payment" timestamp NOT NULL, PRIMARY KEY ("id"))`,
            undefined
        );
        await queryRunner.query(`ALTER TABLE "rent" ADD "spaceId" uuid`);
        await queryRunner.query(`ALTER TABLE "rent" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "rent" ADD CONSTRAINT rentfkspace FOREIGN KEY ("spaceId") REFERENCES "space"("id")`);
        await queryRunner.query(`ALTER TABLE "rent" ADD CONSTRAINT rentfkuser FOREIGN KEY ("userId") REFERENCES "user"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rent" DROP CONSTRAINT rentfkspace`);
        await queryRunner.query(`ALTER TABLE "rent" DROP CONSTRAINT rentfkuser`);
        await queryRunner.query(`ALTER TABLE "rent" DROP COLUMN userId`);
        await queryRunner.query(`ALTER TABLE "rent" DROP COLUMN spaceId`);
        await queryRunner.query(`ALTER TABLE "rent" DROP TABLE rent`);
    }

}
