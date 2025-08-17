import express from 'express';

import Post from './models/Post.js';

import mongoose from 'mongoose';

const app = express();

// connect DB
await mongoose.connect('mongodb://localhost/cleanblog-test-db');
console.log('Database connected succesfully.');

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true })); // helps us to read data in url
app.use(express.json()); // converts url data to json

// ROUTES
app.get('/', async (req, res) => {
  const posts = await Post.find({});
  res.render('index', { posts });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add_post', (req, res) => {
  res.render('add_post');
});

// post pages seperatedly
app.get('/posts/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('post', { post });
});

app.post('/posts', async (req, res) => {
  await Post.create(req.body);
  res.redirect('/');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server started at ${port} port..`);
});
