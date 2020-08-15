import {MigrationInterface, QueryRunner} from "typeorm";

export class createMallSpaceTable1597426521335 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "mall_class_enum" AS ENUM('ELITE', 'MEDIUM', 'SLUM')`, undefined);
        await queryRunner.query(
            `CREATE TABLE "mall" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "mall_class" "mall_class_enum" NOT NULL DEFAULT 'MEDIUM', "location" character varying NOT NULL, "highlights" character varying array, "image_url" character varying array, "map_url" character varying array, PRIMARY KEY ("id"))`,
            undefined
        );
        await queryRunner.query(`CREATE TYPE "space_shape_enum" AS ENUM('SQUARE', 'CIRCLE')`, undefined);
        await queryRunner.query(`CREATE TYPE "allowed_tenant_enum" AS ENUM('FOOD_AND_BEVERAGE', 'FASHION', 'KIDS_AND_ENTERTAINTMENT', 'SMALL_RETAIL', 'BEAUTY', 'GADGET_AND_ELECTRONIC', 'HEALTH', 'FITNESS', 'HOME_AND_LIVING')`, undefined);
        await queryRunner.query(
            `CREATE TABLE "space" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "size" integer NOT NULL DEFAULT 0, "shape" "space_shape_enum" NOT NULL DEFAULT 'SQUARE', "price" integer NOT NULL DEFAULT 0, "allowed_tenant_type" "allowed_tenant_enum" NOT NULL, "image_url" character varying array, PRIMARY KEY ("id"))`,
            undefined
        );
        await queryRunner.query(`ALTER TABLE "space" ADD "mallId" uuid`);
        await queryRunner.query(`ALTER TABLE "space" ADD CONSTRAINT spacefkmall FOREIGN KEY ("mallId") REFERENCES "mall"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "space" DROP CONSTRAINT spacefkmall`);
        await queryRunner.query(`ALTER TABLE "space" DROP COLUMN "mallId"`);
        await queryRunner.query(`DROP TABLE "space"`);
        await queryRunner.query(`DROP TYPE "allowed_tenant_enum"`);
        await queryRunner.query(`DROP TYPE "space_shape_enum"`);
        await queryRunner.query(`DROP TABLE "mall"`);
        await queryRunner.query(`DROP TYPE "mall_class_enum"`);
    }

}
