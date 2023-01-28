import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>Hermes</title>
        <meta name="description" content="Emailing made Lazy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="align-center flex min-h-screen flex-col  bg-zinc-800 pt-16">
        <div className="absolute top-0 flex h-16 w-screen items-center justify-between self-start border-b border-white/20 px-4">
          <button
            className="rounded-md bg-white/10 px-4 py-2 font-semibold text-white no-underline transition hover:bg-white/20"
            onClick={sessionData ? () => signOut() : () => signIn("google")}
          >
            {sessionData ? "Sign out" : "Sign in"}
          </button>
          <p className="text-center text-xl font-light text-white">
            {sessionData ? (
              <span>{sessionData.user?.name}</span>
            ) : (
              <span>Not Logged In</span>
            )}
          </p>
        </div>
        {children}
      </main>
    </>
  );
};

export default Layout;
