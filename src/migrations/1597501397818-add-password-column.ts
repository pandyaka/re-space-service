import { MigrationInterface, QueryRunner } from 'typeorm';

export class addPasswordColumn1597501397818 implements MigrationInterface {
    name = 'addPasswordColumn1597501397818';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "password"  character varying NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`, undefined);
    }
}
