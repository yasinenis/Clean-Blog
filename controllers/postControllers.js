import Post from '../models/Post.js';

export async function getAllPosts(req, res) {
  const posts = await Post.find({}).sort('-dateCreated');
  res.render('index', { posts });
}

export async function getPost(req, res) {
  const post = await Post.findById(req.params.id);
  res.render('post', { post });
}

export async function createPost(req, res) {
  await Post.create(req.body);
  res.redirect('/');
}

export async function updatePost(req, res) {
  const post = await Post.findOne({ _id: req.params.id });
  let content = req.body.write;
  content = content.replace(/\/t\s*(.*?)\s*\/t/g, '<h4>$1</h4>');
  content = content = content.replace(/\n{2,}/g, '\n');
  post.title = req.body.title;
  post.detail = req.body.detail;
  post.write = content;
  await post.save();
  res.redirect(`/posts/${req.params.id}`);
}

export async function deletePost(req, res) {
  await Post.findByIdAndDelete(req.params.id);
  res.redirect('/');
}
