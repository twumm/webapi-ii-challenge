const express = require('express');
const server = express();

const blogDB = require('./data/db');
const port = 5000

server.use(express.json());

server.post('/api/posts', async (req, res) => {
  const blogPost = { title, contents } = req.body;
  try {
    if (!blogPost.title || !blogPost.contents) {
      res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    } else {
      const newPostId = await blogDB.insert(blogPost);
      const newPost = await blogDB.findById(newPostId.id);
      res.status(200).json(newPost);
    }
  }
  catch (error) {
    res.status(500).json({ error: "There was an error while saving the post to the database" });
  }
})

server.post('/api/posts/:id/comments', async (req, res) => {
  res.send('add comments to post').end();
})

server.get('/api/posts', async (req, res) => {
  res.send('get all posts').end();
})

server.get('/api/posts/:id', async (req, res) => {
  res.send('returns post with specified id').end();
})

server.get('/api/posts/:id/comments', async (req, res) => {
  res.send('returns an array of comment objects with the post with the specified id').end();
})

server.delete('/api/posts/:id', async (req, res) => {
  res.send('removes the post with the specified id and returns the deleted post object').end()
})

server.put('/api/posts/:id', async (req, res) => {
  res.send('updates post with specified id');
})

server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
})