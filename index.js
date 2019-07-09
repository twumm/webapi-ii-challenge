const express = require('express');
const cors = require('cors');
const server = express();

const postRoutes = require('./blogs/post-routes');

const port = 5000

server.use(express.json());
server.use(cors());
server.use(postRoutes);

server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
})