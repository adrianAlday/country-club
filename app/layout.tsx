import type { Metadata } from "next";
import "./globals.css";
import LoadingWrapper from "./_components/LoadingWrapper";

export const metadata: Metadata = {
  title: "",
  description: "",
};

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: Readonly<LayoutProps>) => (
  <html lang="en" className={"subpixel-antialiased"}>
    <body>
      <LoadingWrapper>{children}</LoadingWrapper>
    </body>
  </html>
);

export default Layout;
