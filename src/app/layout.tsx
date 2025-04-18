import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Classic 2048",
  description: "Classic 2048 - move and fold",
  icons: {
    icon: "/logotype.png"
    }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <head>
            <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
        </head>
      <body>
        {children}
      </body>
    </html>
  );
}
