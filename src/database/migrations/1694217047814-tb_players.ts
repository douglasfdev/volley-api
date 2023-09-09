import { PlayerEnumType } from 'src/enums';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class TbPlayers1694217047814 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_players',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'rankingPosition',
            type: 'varchar',
          },
          {
            name: 'picturePlayer',
            type: 'varchar',
          },
          {
            name: 'status',
            type: 'enum',
            default: PlayerEnumType.ACTIVE,
            enum: ['0', '1'],
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'tb_players',
      new TableIndex({
        name: 'IDX_tb_players_id',
        columnNames: ['id'],
      }),
    );

    await queryRunner.createForeignKey(
      'tb_players',
      new TableForeignKey({
        columnNames: ['eventId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tb_events',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('tb_players');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('eventId') !== -1,
    );

    await queryRunner.dropForeignKey('tb_players', foreignKey);
    await queryRunner.dropColumn('tb_players', 'event_id');
    await queryRunner.dropIndex('tb_players', 'IDX_tb_players_id');
    await queryRunner.dropTable('tb_players');
  }
}
