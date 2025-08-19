import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// create schema
const PostSchema = new Schema({
  title: String,
  detail: String,
  write: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model('Post', PostSchema);

export default Post;
