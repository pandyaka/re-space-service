import {MigrationInterface, QueryRunner} from "typeorm";

export class createWatchlistTable1597428677205 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "watchlist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "reference_price" integer,  "current_price" integer, "changes"  double precision, PRIMARY KEY ("id"))`,
            undefined
        );
        await queryRunner.query(`ALTER TABLE "watchlist" ADD "spaceId" uuid`);
        await queryRunner.query(`ALTER TABLE "watchlist" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "watchlist" ADD CONSTRAINT watchlistfkspace FOREIGN KEY ("spaceId") REFERENCES "space"("id")`);
        await queryRunner.query(`ALTER TABLE "watchlist" ADD CONSTRAINT watchlistfkuser FOREIGN KEY ("userId") REFERENCES "user"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "watchlist" DROP CONSTRAINT watchlistfkspace`);
        await queryRunner.query(`ALTER TABLE "watchlist" DROP CONSTRAINT watchlistfkuser`);
        await queryRunner.query(`ALTER TABLE "watchlist" DROP COLUMN userId`);
        await queryRunner.query(`ALTER TABLE "watchlist" DROP COLUMN spaceId`);
        await queryRunner.query(`ALTER TABLE "watchlist" DROP TABLE watchlist`);
    }

}
