import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPoolOptionVote1735455344491 implements MigrationInterface {
    name = 'AddPoolOptionVote1735455344491'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pool" ("id" SERIAL NOT NULL, "question" character varying NOT NULL, CONSTRAINT "UQ_a9568a5ed4fbd81124edb5d8340" UNIQUE ("question"), CONSTRAINT "PK_db1bfe411e1516c01120b85f8fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "option" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "numberOfVotes" integer NOT NULL DEFAULT '0', "poolId" integer, CONSTRAINT "PK_e6090c1c6ad8962eea97abdbe63" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vote" ("id" SERIAL NOT NULL, "userId" character varying NOT NULL, "optionId" integer, "poolId" integer, CONSTRAINT "UQ_f312f3916b51ef6ee3f66701fcc" UNIQUE ("poolId", "userId"), CONSTRAINT "PK_2d5932d46afe39c8176f9d4be72" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "option" ADD CONSTRAINT "FK_faaa70187ceeeedfa0867196178" FOREIGN KEY ("poolId") REFERENCES "pool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_4ae2eb8e398ff87416da92ea286" FOREIGN KEY ("optionId") REFERENCES "option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_86b9c0ae3057aa451170728b2bb" FOREIGN KEY ("poolId") REFERENCES "pool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_86b9c0ae3057aa451170728b2bb"`);
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_4ae2eb8e398ff87416da92ea286"`);
        await queryRunner.query(`ALTER TABLE "option" DROP CONSTRAINT "FK_faaa70187ceeeedfa0867196178"`);
        await queryRunner.query(`DROP TABLE "vote"`);
        await queryRunner.query(`DROP TABLE "option"`);
        await queryRunner.query(`DROP TABLE "pool"`);
    }

}
