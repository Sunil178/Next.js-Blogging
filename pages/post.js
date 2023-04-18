import dbConnect from '../libs/db-connect'
import Post from '../models/post'
import DOMPurify from 'dompurify'
const { JSDOM } = require('jsdom')

export default function Home({ content }) {
  return (
        <div dangerouslySetInnerHTML={{__html: content}}></div>
    )
}

export async function getStaticProps(context) {
  await dbConnect()
  const post = await Post.findOne({}, {}, { sort: { 'createdAt' : -1 } })
  const window = new JSDOM('').window
  const purify = DOMPurify(window)
  const sanitizedPost = purify.sanitize(post.content)

  return { props: { content: sanitizedPost } }
}
