import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserEntityAndOthers1726137211098 implements MigrationInterface {
    name = 'AddUserEntityAndOthers1726137211098'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, CONSTRAINT "UQ_d90243459a697eadb8ad56e9092" UNIQUE ("name"), CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cars" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "make" character varying(255) NOT NULL, "model" character varying(255) NOT NULL, "year" integer, "price" numeric NOT NULL, "color" character varying(255), "mileage" integer, "fuelType" character varying(255), "transmission" character varying(255), "engine" character varying(255), "horsepower" integer, "features" text array, "owners" integer, "image" character varying(255), "description" text NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refresh_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "refreshToken" text NOT NULL, "deviceId" text NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_7d8bee0204106019488c4c50ffa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9769b295a8d670435ce210ba15" ON "refresh_tokens" ("deviceId") `);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "bio" text, "image" text, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cars_tags_tags" ("carsId" uuid NOT NULL, "tagsId" uuid NOT NULL, CONSTRAINT "PK_a3eeae1ac151dbcef22c6af09ab" PRIMARY KEY ("carsId", "tagsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fa2cda7b0eea7d383a6043cfd2" ON "cars_tags_tags" ("carsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b09d624ec6f5532b47af544ee6" ON "cars_tags_tags" ("tagsId") `);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_673bd295e52580c0fb09d0fbbb8" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cars_tags_tags" ADD CONSTRAINT "FK_fa2cda7b0eea7d383a6043cfd28" FOREIGN KEY ("carsId") REFERENCES "cars"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cars_tags_tags" ADD CONSTRAINT "FK_b09d624ec6f5532b47af544ee62" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars_tags_tags" DROP CONSTRAINT "FK_b09d624ec6f5532b47af544ee62"`);
        await queryRunner.query(`ALTER TABLE "cars_tags_tags" DROP CONSTRAINT "FK_fa2cda7b0eea7d383a6043cfd28"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_673bd295e52580c0fb09d0fbbb8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b09d624ec6f5532b47af544ee6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fa2cda7b0eea7d383a6043cfd2"`);
        await queryRunner.query(`DROP TABLE "cars_tags_tags"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9769b295a8d670435ce210ba15"`);
        await queryRunner.query(`DROP TABLE "refresh_tokens"`);
        await queryRunner.query(`DROP TABLE "cars"`);
        await queryRunner.query(`DROP TABLE "tags"`);
    }

}
