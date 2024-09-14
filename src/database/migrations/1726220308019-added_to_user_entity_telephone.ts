import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedToUserEntityTelephone1726220308019 implements MigrationInterface {
    name = 'AddedToUserEntityTelephone1726220308019'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "bio" TO "telephone"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "telephone" TO "bio"`);
    }

}
