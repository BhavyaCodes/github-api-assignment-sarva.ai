import { FC, ReactNode } from "react";
import Navbar from "./Navbar";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
