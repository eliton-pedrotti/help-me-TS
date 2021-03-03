import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddAvatarIdToUsers1614786939989 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'avatar_id',
                type: 'varchar',
                isNullable: true
        }))

        await queryRunner.createForeignKey(
            'users',
            new TableForeignKey({
                columnNames: ['avatar_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'files',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'avatar_id')
    }

}
