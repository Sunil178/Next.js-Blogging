import dbConnect from 'libs/db-connect'
import Post from 'models/post'

export default function Home({ content }) {
  return (
      <div className='editor'>
      </div>
    )
}

export async function getStaticProps(context) {
  await dbConnect();
  const posts = await Post.find({}, {}, { sort: { 'createdAt' : -1 } });

  return { props: { posts: JSON.parse(JSON.stringify(posts)) } };
}
