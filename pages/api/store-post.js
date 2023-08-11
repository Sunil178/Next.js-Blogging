import dbConnect from '../../libs/db-connect';
import Post from '../../models/post'

export default async function handler(req, res) {
  const body = req.body

  if (!body.post_data) {
    return res.status(400).json({ data: 'Post page data is required' })
  }

  await dbConnect();

  switch (req.method) {
    case 'GET':
        return res.status(405).send("Method not allowed")
    case 'POST':
      try {
        await Post.create({
          'content': body.post_data,
        })
        return res.redirect(301, '/post')
      } catch (error) {
        return res.status(400).json({ success: false, data: error })
      }
    default:
      return res.status(400).json({ success: false })
  }

  // res.status(200).json({ data: `${body.post_data}` })
}