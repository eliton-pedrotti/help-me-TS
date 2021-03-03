import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateHelpFiles1614779779933 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'helpfiles',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: "file_id",
                        type: "varchar",
                    },
                    {
                        name: 'help_id',
                        type: 'varchar'
                    },
                    {
                        name: "path",
                        type: 'varchar'
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ],
                foreignKeys: [
                    {
                        name: "file_image",
                        columnNames: ["file_id"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "files",
                        onUpdate: "CASCADE",
                        onDelete: "CASCADE",
                    },
                    {
                        name: "help_image",
                        columnNames: ["help_id"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "helps",
                        onUpdate: "CASCADE",
                        onDelete: "CASCADE",
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('helpfiles');
    }

}
