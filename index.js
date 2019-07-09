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
  const { text } = req.body;
  const { id } = req.params;
  const comment = { text, post_id: Number(id) };
  try {
    if (!comment.post_id) {
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    } else if (!comment.text) {
      res.status(404).json({ errorMessage: "Please provide text for the comment." })
    } else {
      const newCommentId = await blogDB.insertComment(comment);
      const newComment = await blogDB.findCommentById(newCommentId.id);
      res.status(201).json(newComment);
    }
  }
  catch (error) {
    res.status(500).json({ error: "There was an error while saving the comment to the database" });
  }
})

server.get('/api/posts', async (req, res) => {
  try {
    const blogs = await blogDB.find();
    res.status(200).json(blogs);
  }
  catch (error) {
    res.status(500).json({ error: "The posts information could not be retrieved." });
  }
})

server.get('/api/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await blogDB.findById(id);
    if (!post.length) {
      res.status(404).json({ message: "The post with the specified ID does not exist." });
    } else {
      res.status(200).json(post);
    }
  }
  catch (error) {
    res.status(500).json({ error: "The post information could not be retrieved." });
  }
})

server.get('/api/posts/:id/comments', async (req, res) => {
  // res.send('returns an array of comment objects with the post with the specified id').end();
  const { id } = req.params;
  try {
    const post = await blogDB.findById(id);
    const comments = await blogDB.findPostComments(id);
    if (!post.length) {
      res.status(404).json({ message: "The post with the specified ID does not exist." });
    } else {
      res.status(200).json(comments);
    }
  }
  catch (error) {
    res.status(500).json({ error: "The comments information could not be retrieved." });
  }
})

server.delete('/api/posts/:id', async (req, res) => {
  // res.send('removes the post with the specified id and returns the deleted post object').end()
  const { id } = req.params;
  try {
    const deletedPost = await blogDB.findById(id);
    const deleted = await blogDB.remove(id);
    if (!deletedPost || !deleted) {
      res.status(404).json({ error: "The post with the specified ID does not exist." })
    } else {
      res.status(200).json({ count: deleted, deletedPost })
    }
  }
  catch (error) {
    res.status(500).json({ error: "The post could not be removed" });
  }
})

server.put('/api/posts/:id', async (req, res) => {
  // res.send('updates post with specified id');
  const { id } = req.params;
  const blogPost = { title, contents } = req.body;
  try {
    const post = await blogDB.findById(id);
    if (!post.length) {
      res.status(404).json({ message: "The post with the specified ID does not exist." });
    } else if (!blogPost.title || !blogPost.contents) {
      res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    } else {
      const updated = await blogDB.update(id, blogPost);
      const updatedPost = await blogDB.findById(id);
      res.status(200).json(updatedPost);
    }
  }
  catch (error) {
    res.status(500).json({ error: "The post information could not be modified." });
  }
})

server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
})