const { Client } = require("pg");
const client = new Client({
  host: "ep-purple-rice-apt0jmer-pooler.c-7.us-east-1.aws.neon.tech",
  port: 5432,
  database: "neondb",
  user: "neondb_owner",
  password: "npg_7l5xdbXyfLFu",
  ssl: { rejectUnauthorized: false },
});
async function run() {
  try {
    await client.connect();
    console.log("Connected to Neon Postgres");
    await client.query(`ALTER TABLE recipes ALTER COLUMN image_url TYPE TEXT;`);
    console.log("Successfully altered image_url to TEXT");
    await client.query(
      `ALTER TABLE recipes ALTER COLUMN description TYPE TEXT;`,
    );
    console.log("Successfully altered description to TEXT");
    process.exit(0);
  } catch (err) {
    console.error("Database Error:", err);
    process.exit(1);
  }
}
run();
