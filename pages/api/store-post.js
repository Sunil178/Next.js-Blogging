import dbConnect from '../../libs/db-connect';
import Post from '../../models/post'

export default async function handler(req, res) {
  const { method } = req
  const body = req.body

  console.log('body: ', body)

  if (!body.post_data) {
    return res.status(400).json({ data: 'Post page data is required' })
  }

  await dbConnect();
  console.log('Post: ', await Post.find())

  switch (method) {
    case 'GET':
        res.status(405).send("Method not allowed")
        break
    case 'POST':
      try {
        await Post.create({
          'content': body.post_data,
        })
        return res.redirect(301, '/post')
      } catch (error) {
        res.status(400).json({ success: false, data: error })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }

  res.status(200).json({ data: `${body.post_data}` })
}