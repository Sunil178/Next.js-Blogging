import { TinyMCEEditor } from '../components/tinymce'
import dbConnect from '../libs/db-connect'
import Post from '../models/post'

export default function Home({ content }) {
  return (
    <div className='editor'>
	    <TinyMCEEditor content={content} />
    </div>
    )
}

export async function getStaticProps(context) {
  await dbConnect();
  const post = await Post.findOne({}, {}, { sort: { 'createdAt' : -1 } });

  // return { props: { content: post.content } };
  return { props: { content: '' } };
}
