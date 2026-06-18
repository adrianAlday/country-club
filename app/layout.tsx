import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "",
  description: "",
};

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: Readonly<LayoutProps>) => (
  <html lang="en" className={"subpixel-antialiased"}>
    <body>{children}</body>
  </html>
);

export default Layout;
