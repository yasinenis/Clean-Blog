import Post from '../models/Post.js';

export async function getAddPage(req, res) {
  res.render('add_post');
}

export async function getAboutPage(req, res) {
  res.render('about');
}

export async function getEditPage(req, res) {
  const post = await Post.findById(req.params.id);
  res.render('edit', { post });
}
