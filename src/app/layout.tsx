import type { Metadata } from 'next';
import { Inter, Noto_Sans_Thai } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const notoSansThai = Noto_Sans_Thai({ subsets: ['thai'], weight: ['400', '500', '600', '700', '900'] });

export const metadata: Metadata = {
  title: 'วัดปากน้ำ - ระบบบัญชีการเงิน',
  description: 'ระบบบัญชีการเงินแบบครบครันสำหรับการจัดการและรายงานทางการเงิน',
  icons: {
    icon: '🏯',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className={`${notoSansThai.className} bg-gray-50`}>
        {children}
      </body>
    </html>
  );
}
