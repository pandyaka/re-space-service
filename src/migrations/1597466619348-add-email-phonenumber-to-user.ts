import {MigrationInterface, QueryRunner} from "typeorm";

export class addEmailPhonenumberToUser1597466619348 implements MigrationInterface {
    name = 'addEmailPhonenumberToUser1597466619348'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "phone_number" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP "email"`);
        await queryRunner.query(`ALTER TABLE "user" DROP "phone_number"`);
    }

}
