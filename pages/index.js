
import { TinyMCEEditor } from '../components/tinymce'
import TempUser from '../models/temp-user'
import User from '../models/user'
import UserInterest from '../models/user-interest'
import Post from '../models/post'
import Category from '../models/category'
import dbConnect from '../libs/db-connect';

export default function Home() {
  return (
	    <TinyMCEEditor content=''/>
    )
}

export async function getStaticProps(context) {
  await dbConnect();
  TempUser.find({}).then((data) => console.log(data));
  User.find({}).then((data) => console.log(data));
  Post.find({}).then((data) => console.log(data));
  Category.find({}).then((data) => console.log(data));
  UserInterest.find({}).then((data) => console.log(data));

  return { props: {} };
}
