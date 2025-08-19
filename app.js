import express from 'express';

import mongoose from 'mongoose';

import methodOverride from 'method-override';

import * as postControllers from './controllers/postControllers.js';
import * as pageControllers from './controllers/pageControllers.js';

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
app.get('/', postControllers.getAllPosts);
app.get('/posts/:id', postControllers.getPost);
app.post('/posts', postControllers.createPost);
app.put('/posts/:id', postControllers.updatePost);
app.delete('/posts/:id', postControllers.deletePost);

app.get('/about', pageControllers.getAboutPage);
app.get('/add_post', pageControllers.getAddPage);
app.get('/posts/edit/:id', pageControllers.getEditPage);

const port = 3000;
app.listen(port, () => {
  console.log(`Server started at ${port} port..`);
});
