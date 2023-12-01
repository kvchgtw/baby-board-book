//layout.js 可以把每個頁面都有的元素，套用在所有頁面上
//每個頁面不同的內容，會從{children}中代入。
// import { Suspense } from 'react'
import { Noto_Sans } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes';
import Header from './components/header' // 注意這裡改為默認導入
import './globals.css'
import Footer from './components/Footer'


const noto = Noto_Sans({ 
  subsets: ['latin'],
  weight: ['100', '200', '300','400', '500', '600','700', '800','900']
})

export const metadata = {
  title: 'AI Baby Board Book',
  description: 'AI Baby Board Book, AI 寶寶翻翻書',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{
      baseTheme: dark,
      variables: { colorPrimary: '#F5A524' },

    }}>
      <html lang="en">

        <body className={noto.className}>
        <Header />
            {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  )
}
