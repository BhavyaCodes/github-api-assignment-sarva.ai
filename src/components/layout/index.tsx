import { FC, ReactNode } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Navbar from "./Navbar";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();

  return (
    <div>
      {session ? (
        <>
          Signed in as {session.user?.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <>
          Not signed in <br />
          <a
            href="/api/auth/signin"
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            Sign in
          </a>
        </>
      )}
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
