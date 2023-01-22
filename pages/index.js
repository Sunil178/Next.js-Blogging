import dynamic from 'next/dynamic';
// import SyntaxHome from '../components/syntax-highlighter'

const ReactQuill = dynamic(import('../components/ReactQuill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})  

export default function Home() {
  // return <SyntaxHome />

  return (
	    <ReactQuill />
    )
}
