import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1692653997608 implements MigrationInterface {
    name = 'Migration1692653997608'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "artists" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_09b823d4607d2675dc4ffa82261" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "albums" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" uuid, CONSTRAINT "PK_838ebae24d2e12082670ffc95d7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "albums_to_favs" ("id" SERIAL NOT NULL, "albumId" uuid, CONSTRAINT "REL_5c63c1b84911d6488d5e624987" UNIQUE ("albumId"), CONSTRAINT "PK_a5fc5d5b6e14326856aa70b89bf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "artists_to_favs" ("id" SERIAL NOT NULL, "artistId" uuid, CONSTRAINT "REL_99be808472a74f6e84b8178c42" UNIQUE ("artistId"), CONSTRAINT "PK_1c61d785ec25f8ff73c923d119c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tracks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "artistId" uuid, "albumId" uuid, "duration" integer NOT NULL, CONSTRAINT "PK_242a37ffc7870380f0e611986e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tracks_to_favs" ("id" SERIAL NOT NULL, "trackId" uuid, CONSTRAINT "REL_bc2b36ae316764404407c79350" UNIQUE ("trackId"), CONSTRAINT "PK_ee9303eb61c7192d157ab55b72b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "version" integer NOT NULL, "createdAt" bigint NOT NULL, "updatedAt" bigint NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "refreshToken" character varying NOT NULL, CONSTRAINT "REL_d417e5d35f2434afc4bd48cb4d" UNIQUE ("userId"), CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "albums" ADD CONSTRAINT "FK_ed378d7c337efd4d5c8396a77a1" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "albums_to_favs" ADD CONSTRAINT "FK_5c63c1b84911d6488d5e624987b" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "artists_to_favs" ADD CONSTRAINT "FK_99be808472a74f6e84b8178c42e" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tracks" ADD CONSTRAINT "FK_62f595181306916265849fced48" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tracks" ADD CONSTRAINT "FK_5c52e761792791f57de2fec342d" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tracks_to_favs" ADD CONSTRAINT "FK_bc2b36ae316764404407c79350a" FOREIGN KEY ("trackId") REFERENCES "tracks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tokens" ADD CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tokens" DROP CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2"`);
        await queryRunner.query(`ALTER TABLE "tracks_to_favs" DROP CONSTRAINT "FK_bc2b36ae316764404407c79350a"`);
        await queryRunner.query(`ALTER TABLE "tracks" DROP CONSTRAINT "FK_5c52e761792791f57de2fec342d"`);
        await queryRunner.query(`ALTER TABLE "tracks" DROP CONSTRAINT "FK_62f595181306916265849fced48"`);
        await queryRunner.query(`ALTER TABLE "artists_to_favs" DROP CONSTRAINT "FK_99be808472a74f6e84b8178c42e"`);
        await queryRunner.query(`ALTER TABLE "albums_to_favs" DROP CONSTRAINT "FK_5c63c1b84911d6488d5e624987b"`);
        await queryRunner.query(`ALTER TABLE "albums" DROP CONSTRAINT "FK_ed378d7c337efd4d5c8396a77a1"`);
        await queryRunner.query(`DROP TABLE "tokens"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "tracks_to_favs"`);
        await queryRunner.query(`DROP TABLE "tracks"`);
        await queryRunner.query(`DROP TABLE "artists_to_favs"`);
        await queryRunner.query(`DROP TABLE "albums_to_favs"`);
        await queryRunner.query(`DROP TABLE "albums"`);
        await queryRunner.query(`DROP TABLE "artists"`);
    }

}
