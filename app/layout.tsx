import './globals.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const metadata = {
  title: 'GhostGram - Anonymous Messaging Platform',
  description: 'Send anonymous messages to anyone, anywhere. Stay mysterious, stay connected with GhostGram.',
  keywords: 'anonymous messaging, ghost messages, secure messaging, anonymous chat',
  authors: [{ name: 'GhostGram Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          toastStyle={{
            background: 'rgba(15, 15, 35, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 212, 255, 0.3)',
            color: '#e2e8f0',
          }}
        />
      </body>
    </html>
  )
}
