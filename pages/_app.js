import '@/styles/globals.css'
import { QuioscoProvider } from '@/context/QuioscoProvider'

// Archivon principal - Aqui se envuekve toda la app en el context
export default function App({ Component, pageProps }) {
  return (
    <QuioscoProvider>
      <Component {...pageProps} />
    </QuioscoProvider>
  )
}
