import { Noto_Sans_JP, Roboto } from 'next/font/google';

export const roboto = Roboto({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
  preload: false,
});

export const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  weight: ['300','400','500'],
  subsets: ["latin"],
  display: 'swap',
  preload: false
});