import '@/styles/globals.css'
import '@/styles/home.css'
import { queryClient } from '@/utils/frontend/queryClient';
import type { AppProps } from 'next/app'
import { Open_Sans } from 'next/font/google'
import { QueryClientProvider } from "react-query";

const open_sans = Open_Sans({
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={open_sans.className}>
      <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      </QueryClientProvider>
    </main>
  )
}
