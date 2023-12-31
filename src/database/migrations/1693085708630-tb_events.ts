import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class TbEvents1693085708630 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_events',
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
            name: 'active',
            type: 'int',
          },
          {
            name: 'operation',
            type: 'varchar',
          },
          {
            name: 'value',
            type: 'int',
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
      'tb_events',
      new TableIndex({
        name: 'IDX_tb_events_id',
        columnNames: ['id'],
      }),
    );

    await queryRunner.createIndex(
      'tb_events',
      new TableIndex({
        name: 'IDX_tb_events_name',
        columnNames: ['name'],
      }),
    );

    await queryRunner.createForeignKey(
      'tb_events',
      new TableForeignKey({
        columnNames: ['playerId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tb_players',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('tb_events');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('playerId') !== -1,
    );

    await queryRunner.dropForeignKey('tb_event', foreignKey);
    await queryRunner.dropColumn('tb_event', 'eventsId');
    await queryRunner.dropTable('tb_events');
    await queryRunner.dropIndex('tb_events', 'IDXs_tb_events_id');
  }
}
