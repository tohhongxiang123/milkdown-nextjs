import '../styles/globals.css'
import 'katex/dist/katex.min.css'
import '../styles/prism-styles.css'
import '../styles/milkdown-editor.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
