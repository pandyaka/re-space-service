import {MigrationInterface, QueryRunner} from "typeorm";

export class renameMallClassColumn1597480861206 implements MigrationInterface {
    name = 'renameMallClassColumn1597480861206'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mall" RENAME "mall_class" to "class"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mall" RENAME "class" to "mall_class"`);
    }

}
