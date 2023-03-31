
import { TinyMCEEditor } from '../components/tinymce'
import dbConnect from '../libs/db-connect';
import TempUser from '../models/temp-user'
import User from '../models/user'
import UserInterest from '../models/user-interest'
import Post from '../models/post'
import Category from '../models/category'
import Comment from '../models/comment'
import UserVote from '../models/user-vote'
import PostVote from '../models/post-vote'
import CommentVote from '../models/comment-vote'

export default function Home() {
  return (
	    <TinyMCEEditor content=''/>
    )
}

export async function getStaticProps(context) {
  await dbConnect();
  TempUser.find();
  User.find();
  Post.find();
  UserInterest.find();
  Category.find();
  Comment.find();
  UserVote.find();
  PostVote.find();
  CommentVote.find();

  return { props: {} };
}
