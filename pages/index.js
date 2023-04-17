
import { TinyMCEEditor } from '../components/tinymce'
import dbConnect from '../libs/db-connect';
import Post from '../models/post';

export default function Home({ content }) {
  return (
	    <TinyMCEEditor content={content} />
    )
}

export async function getStaticProps(context) {
  await dbConnect();
  const post = await Post.findOne({}, {}, { sort: { 'createdAt' : -1 } });
  console.log(post);

  return { props: { content: post.content } };
}
