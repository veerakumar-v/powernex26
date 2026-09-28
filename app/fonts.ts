// app/fonts.ts
import { Geist_Pixel } from 'next/font/google';

export const geistPixel = Geist_Pixel({
  subsets: ['latin'],
  axes: ['ELSH'], // keep the shape axis variable
  variable: '--font-geist-pixel',
  display: 'swap',
});
