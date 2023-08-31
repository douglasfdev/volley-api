import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class TbVoleyball1693084154892 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_voleyball',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: `uuid_generate_v4()`,
          },
          {
            name: 'category',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
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
      'tb_voleyball',
      new TableIndex({
        name: 'IDX_tb_voleyball_id',
        columnNames: ['id'],
      }),
    );

    await queryRunner.addColumn(
      'tb_voleyball',
      new TableColumn({
        name: 'eventsId',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'tb_voleyball',
      new TableForeignKey({
        columnNames: ['eventsId'],
        referencedTableName: 'tb_events',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('tb_voleyball');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('eventsId') !== -1,
    );

    await queryRunner.dropForeignKey('tb_voleyball', foreignKey);
    await queryRunner.dropColumn('tb_voleyball', 'id');
    await queryRunner.dropIndex('tb_voleyball', 'IDX_tb_voleyball_id');
    await queryRunner.dropTable('tb_voleyball');
  }
}
