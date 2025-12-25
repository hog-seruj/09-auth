import css from './Home.module.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import TanstackProvider from '@/components/TanStackProvider/TanStackProvider';
import AuthProvider from '@/components/AuthProvider/AuthProvider';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NoteHub — Personal Notes Manager (Next.js Routing Demo)',
  description:
    'A simple Next.js application demonstrating file-based routing and page navigation. The project showcases clean structure, reusable layouts, and deployment on Vercel.',
  openGraph: {
    title: 'NoteHub — Personal Notes Manager (Next.js Routing Demo)',
    description:
      'A simple Next.js application demonstrating file-based routing and page navigation. The project showcases clean structure, reusable layouts, and deployment on Vercel.',
    url: `https://09-auth-delta-sepia.vercel.app`,
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        alt: 'Note Hub',
        width: 300,
        height: 300,
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <TanstackProvider>
          <AuthProvider>
            <Header />
            <main className={css.main}>
              {children}
              {modal}
            </main>
            <Footer />
          </AuthProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
