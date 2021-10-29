import { MigrationInterface, QueryRunner } from 'typeorm';

export class CollegeRankMigration1622994693241 implements MigrationInterface {
  name = 'CollegeRankMigration1622994693241';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `rank` (`id` int NOT NULL AUTO_INCREMENT, `rank` int NOT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `collegeId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      "CREATE TABLE `college` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `image` varchar(255) NOT NULL, `city` varchar(255) NOT NULL, `state` varchar(255) NOT NULL, `description` text NOT NULL, `founded_date` date NULL, `website` varchar(255) NULL, `status` tinyint NOT NULL DEFAULT 1, `rating` int NOT NULL DEFAULT '1', `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE=InnoDB",
    );
    await queryRunner.query(
      'ALTER TABLE `rank` ADD CONSTRAINT `FK_a5de07aa0903c921d35a6d01422` FOREIGN KEY (`collegeId`) REFERENCES `college`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `rank` DROP FOREIGN KEY `FK_a5de07aa0903c921d35a6d01422`',
    );
    await queryRunner.query('DROP TABLE `college`');
    await queryRunner.query('DROP TABLE `rank`');
  }
}
