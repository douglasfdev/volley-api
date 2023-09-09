import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class TbEventPlayer1694219786210 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_event_player',
        columns: [
          {
            name: 'event_id',
            type: 'uuid',
          },
          {
            name: 'player_id',
            type: 'uuid',
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'tb_event_player',
      new TableIndex({
        name: 'IDX_tb_event_player_id',
        columnNames: ['event_id'],
      }),
    );

    await queryRunner.createIndex(
      'tb_event_player',
      new TableIndex({
        name: 'IDX_tb_event_player_id',
        columnNames: ['player_id'],
      }),
    );

    await queryRunner.createForeignKey(
      'tb_event_player',
      new TableForeignKey({
        columnNames: ['event_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tb_events',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'tb_event_player',
      new TableForeignKey({
        columnNames: ['player_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'player_id',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('tb_event_player');
    const eventForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('event_id') !== -1,
    );

    await queryRunner.dropForeignKey('tb_event_player', eventForeignKey);

    const playerForeignKey2 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('player_id') !== -1,
    );

    await queryRunner.dropForeignKey('tb_event_player', playerForeignKey2);

    await queryRunner.dropColumn('tb_event_player', 'event_id');
    await queryRunner.dropColumn('tb_event_player', 'player_id');
    await queryRunner.dropIndex('tb_event_player', 'IDX_tb_event_player_id');
    await queryRunner.dropTable('tb_event_player');
  }
}
