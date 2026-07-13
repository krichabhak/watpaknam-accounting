import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "วัดปากน้ำ - ระบบบัญชี",
  description: "ระบบจัดการบัญชีรายรับรายจ่ายแบบมืออาชีพสำหรับวัดปากน้ำ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body>
        {children}
      </body>
    </html>
  );
}
