import express from 'express';

import Post from './models/Post.js';

import mongoose from 'mongoose';

import methodOverride from 'method-override';

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

app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

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

app.get('/posts/edit/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('edit', { post });
});

app.put('/posts/:id', async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  const content = req.body.write;
  const newContent = content.replace(/\/t\s*(.*?)\s*\/t/g, '<h4>$1</h4>');
  post.title = req.body.title;
  post.detail = req.body.detail;
  post.write = newContent;
  await post.save();
  res.redirect(`/posts/${req.params.id}`);
});

app.delete('/posts/:id', async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server started at ${port} port..`);
});
