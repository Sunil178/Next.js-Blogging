
import { CustomEditor } from '../components/tinymce'

/* import dynamic from 'next/dynamic';
// import SyntaxHome from '../components/syntax-highlighter'

const ReactDraft = dynamic(import('../components/tinymce'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
}) */

export default function Home() {
  // return <SyntaxHome />

  return (
	    <CustomEditor />
    )
}
