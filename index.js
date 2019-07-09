const express = require('express');
const server = express();

const blogDB = require('./data/db');
const port = 5000

server.use(express.json());

server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
})