import { MigrationInterface, QueryRunner } from 'typeorm';

export class addRentToSpace1597523822395 implements MigrationInterface {
    name = 'addRentToSpace1597523822395';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "space" ADD "rentId" uuid`, undefined);
        await queryRunner.query(
            `ALTER TABLE "space" ADD CONSTRAINT spacefkrent FOREIGN KEY ("rentId") REFERENCES "rent"("id")`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "space" DROP CONSTRAINT spacefkrent`);
        await queryRunner.query(`ALTER TABLE "space" DROP COLUMN "rentId"`, undefined);
    }
}
