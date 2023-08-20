import "@fontsource/roboto/400.css";
// import '../styles/globals.css'
import '../styles/custom.css'
import '../styles/post-tags.css'

import '../styles/prism.js/prism-tomorrow-night.css'
import '../styles/prism.js/prism-line-numbers.min.css'
import 'highlight.js/styles/default.css'
import '../public/assets/libs/prism.js/prism-tomorrow-night.js'
import '../public/assets/libs/prism.js/prism-line-numbers.min.js'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
