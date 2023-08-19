import { TinyMCEEditor } from '../components/tinymce'
import dbConnect from '../libs/db-connect'
import Post from '../models/post'
import styles from '../styles/post.module.css'

export default function Home({ content }) {
  return <>
      <form action="/api/store-post" method="post" id="post-form" className={styles.postForm}>
        <div className='editor'>
          <div className={styles.cardContainer}>
            <div className={styles.card}>

              <h2 className={styles.head}>Title</h2>
              <label className={styles.input}>
                <textarea className={`${styles.textarea} ${styles.inputField}`} type="text" name='title' placeholder=" " ></textarea>
                <span className={styles.inputLabel}>Title</span>
              </label>

              <h2 className={styles.head}>Title Description</h2>
              <label className={styles.input}>
                <textarea className={`${styles.textarea} ${styles.inputField}`} type="text" name='titleDescription' placeholder=" " ></textarea>
                <span className={styles.inputLabel}>Title Description</span>
              </label>

              <h2 className={styles.head}>Slug</h2>
              <label className={styles.input}>
                <input className={styles.inputField} type="text" name='slug' placeholder=" " />
                <span className={styles.inputLabel}>Slug</span>
              </label>

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

export async function getStaticProps(context) {
  await dbConnect();
  const post = await Post.findOne({}, {}, { sort: { 'createdAt' : -1 } });

  // return { props: { content: post.content } };
  return { props: { content: '' } };
}
