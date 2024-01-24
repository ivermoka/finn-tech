const http = require("http");
const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const port = process.env.PORT || 3000;

const pool = new Pool({
  user: process.env.NEONUSER,
  password: process.env.NEONPASS,
  host: "ep-twilight-cell-35826753.eu-central-1.aws.neon.tech",
  database: "job-scraper",
  ssl: { rejectUnauthorized: false },
});

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle API request
  if (req.url === "/api" && req.method === "GET") {
    handleApiRequest(req, res);
  } else {
    // Handle other requests
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

async function handleApiRequest(req, res) {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM technology_counts;");
    const items = result.rows.map((row) => ({
      id: row.id,
      tech: row.tech,
      count: row.count,
    }));
    client.release();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(items));
  } catch (error) {
    console.error("Error querying the database:", error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
}

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
