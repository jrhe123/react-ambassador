import React, { FC } from "react";
import Header from "./Header";
import Nav from "./Nav";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Nav />
      <main role="main">
        <Header />
        <div className="album py-5 bg-light">
          <div className="container">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
