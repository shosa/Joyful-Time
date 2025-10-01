import type { Metadata } from 'next';
import { Playfair_Display, Poppins } from 'next/font/google';
import './globals.css';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-serif-elegant'
});

const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-sans-modern'
});

export const metadata: Metadata = {
  title: 'Joyful Time - Eventi e Matrimoni a Lecce e nel Salento',
  description: 'Agenzia di eventi specializzata in matrimoni, feste private e spettacoli. Dedizione e professionalità per il tuo evento perfetto.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={`${playfair.variable} ${poppins.variable} font-sans-modern antialiased`}>
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
