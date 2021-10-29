import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRatingInRankTable1625036281091 implements MigrationInterface {
    name = 'AddRatingInRankTable1625036281091'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `admin` CHANGE `created_at` `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `admin` CHANGE `updated_at` `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `rank` DROP FOREIGN KEY `FK_a5de07aa0903c921d35a6d01422`");
        await queryRunner.query("ALTER TABLE `rank` CHANGE `created_at` `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `rank` CHANGE `updated_at` `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `rank` CHANGE `collegeId` `collegeId` int NULL");
        await queryRunner.query("ALTER TABLE `college` CHANGE `image` `image` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `college` CHANGE `founded_date` `founded_date` date NULL");
        await queryRunner.query("ALTER TABLE `college` CHANGE `website` `website` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `college` CHANGE `created_at` `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `college` CHANGE `updated_at` `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `rank` ADD CONSTRAINT `FK_a5de07aa0903c921d35a6d01422` FOREIGN KEY (`collegeId`) REFERENCES `college`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `rank` DROP FOREIGN KEY `FK_a5de07aa0903c921d35a6d01422`");
        await queryRunner.query("ALTER TABLE `college` CHANGE `updated_at` `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()");
        await queryRunner.query("ALTER TABLE `college` CHANGE `created_at` `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()");
        await queryRunner.query("ALTER TABLE `college` CHANGE `website` `website` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `college` CHANGE `founded_date` `founded_date` date NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `college` CHANGE `image` `image` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `rank` CHANGE `collegeId` `collegeId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `rank` CHANGE `updated_at` `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()");
        await queryRunner.query("ALTER TABLE `rank` CHANGE `created_at` `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()");
        await queryRunner.query("ALTER TABLE `rank` ADD CONSTRAINT `FK_a5de07aa0903c921d35a6d01422` FOREIGN KEY (`collegeId`) REFERENCES `college`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `admin` CHANGE `updated_at` `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()");
        await queryRunner.query("ALTER TABLE `admin` CHANGE `created_at` `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()");
    }

}
