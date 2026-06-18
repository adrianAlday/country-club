import type { Metadata } from "next";
import "./globals.css";
import LoadingWrapper from "./_components/LoadingWrapper";
import RepoLogger from "./_components/RepoLogger";

export const metadata: Metadata = {
  title: "Country Club at Dru Hill",
  description: "",
};

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: Readonly<LayoutProps>) => (
  <html lang="en" className={"subpixel-antialiased"}>
    <body>
      <div className="flex justify-center">
        <div className="w-lvw max-w-[600px] p-4">
          <LoadingWrapper>{children}</LoadingWrapper>

          <RepoLogger />
        </div>
      </div>
    </body>
  </html>
);

export default Layout;
