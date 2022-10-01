import fs from 'fs';
import path from 'path';
import { Connection } from 'typeorm';
const args = require('minimist')(process.argv.slice(2));

const migrations = fs.readdirSync(path.join(__dirname, 'migrations', 'tenant')).filter((f) => /.js|.ts/.test(f));

migrations.forEach((m) => {
  const content = fs.readFileSync(path.join(__dirname, 'migrations', 'tenant', m), 'utf8');

  const dynamic = content.replace(/"TENANT"/g, '"${(queryRunner.connection.options as any).schema}"');

  fs.writeFileSync(path.join(__dirname, 'migrations', 'tenant', m), dynamic, { encoding: 'utf8' });
});

const options = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'ormconfig.json'), 'utf8') || '[]');

const config = options.find((o: any) => o.name === 'tenant');

const runMigrationForTenant = async (tenant: string, baseConfig: any) => {
  const connection = new Connection({
    ...baseConfig,
    schema: tenant,
  });

  await connection.connect();
  await connection.query(`CREATE SCHEMA IF NOT EXISTS "${tenant}"`);
  const res = await connection.runMigrations();

  return res;
};

(async () => {
  if (!config) {
    console.error('Did not find valid orm config');
    return;
  }

  const schema = args.S || args.s || args.schema;
  const schemas = ['TENANT'];
  if (schema) schemas.push(schema);
  else {
    const connection = new Connection(config);
    await connection.connect();
    const res = await connection.query(`
      SELECT nspname 
      FROM pg_catalog.pg_namespace 
      WHERE nspname NOT LIKE 'pg_%' AND nspname != 'information_schema' AND nspname != 'public'
    `);
    await connection.close();
    schemas.push(...res.map((r: any) => r.nspname));
  }
  if (schemas.length === 0) return;

  for (const schema of schemas) {
    await runMigrationForTenant(schema, config);
  }
  process.exit(0);
})();
