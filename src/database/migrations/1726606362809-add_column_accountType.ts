import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnAccountType1726606362809 implements MigrationInterface {
    name = 'AddColumnAccountType1726606362809'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_accounttype_enum" AS ENUM('basic', 'premium')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "accountType" "public"."users_accounttype_enum" NOT NULL DEFAULT 'basic'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "accountType"`);
        await queryRunner.query(`DROP TYPE "public"."users_accounttype_enum"`);
    }

}
