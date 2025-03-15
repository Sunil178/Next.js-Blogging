import { TinyMCEEditor } from '@/components/tinymce'
import { PostTag } from '@/components/post-tags'
import { BannerImage } from '@/components/post-banner'
import dbConnect from '@/libs/db-connect'
import Post from '@/models/Post'
import styles from '@/styles/post.module.css'

export default function AddPost({ content }) {
  return <>
      <form action="/api/posts" method="POST" id="post-form" className={styles.postForm}>
        <div className='editor'>
          <div className={styles.cardContainer}>
            <div className={styles.card}>

              <h2 className={styles.head}>Banner</h2>
              <BannerImage defaultImage={null} />

              <h2 className={styles.head}>Title</h2>
              <label className={styles.input}>
                <textarea className={`${styles.textarea} ${styles.inputField}`} type="text" name='title' placeholder=" " ></textarea>
                <span className={styles.inputLabel}>Title...</span>
              </label>

              <h2 className={styles.head}>Title Description</h2>
              <label className={styles.input}>
                <textarea className={`${styles.textarea} ${styles.inputField}`} type="text" name='titleDescription' placeholder=" " ></textarea>
                <span className={styles.inputLabel}>Title Description...</span>
              </label>

              <h2 className={styles.head}>URL Slug</h2>
              <label className={styles.input}>
                <input className={styles.inputField} type="text" name='slug' placeholder=" " />
                <span className={styles.inputLabel}>Slug...</span>
              </label>

              <h2 className={styles.head}>Tags</h2>
              <PostTag />

            </div>
          </div>
        </div>

        <div className='editor'>
          <div className={`${styles.cardEditor}`}>
            <TinyMCEEditor content={content} />
          </div>
        </div>
      </form>
    </>
}

export const fetchPosts = async () => {
  await dbConnect();
  const posts = await Post.find({}, {}, { sort: { 'createdAt' : -1 } });
  return posts;
}
