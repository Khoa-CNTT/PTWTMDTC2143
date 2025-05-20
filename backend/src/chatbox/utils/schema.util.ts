// src/chatbox/utils/schema.util.ts
import { DataSource } from 'typeorm';

export async function getSchemaStr(dataSource: DataSource): Promise<string> {
  const queryRunner = dataSource.createQueryRunner();
  const tables = await queryRunner.getTables();
  const lines: string[] = [];

  for (const table of tables) {
    lines.push(`- ${table.name}:`);
    for (const column of table.columns) {
      lines.push(`  • ${column.name} (${column.type})`);
    }

    for (const foreignKey of table.foreignKeys) {
      lines.push(
        `  🔗 FOREIGN KEY (${foreignKey.columnNames.join(', ')}) REFERENCES ${foreignKey.referencedTableName}(${foreignKey.referencedColumnNames.join(', ')})`
      );
    }
  }

  await queryRunner.release();
  return lines.join('\n');
}
