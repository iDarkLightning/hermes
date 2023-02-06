import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Tab from "./tab";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>Hermes</title>
        <meta name="description" content="Emailing made Lazy" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="rgb(39, 39, 42)" />
      </Head>
      <main className="align-center flex min-h-screen flex-col items-center  bg-zinc-800 pt-20">
        <div className="absolute top-0 flex h-16 w-screen items-center justify-between self-start border-b border-zinc-300/20 px-4">
          <div className="flex-1">
            <button
              className="rounded-md bg-white/10 px-4 py-2 font-semibold text-zinc-300 no-underline transition hover:bg-white/20"
              onClick={sessionData ? () => signOut() : () => signIn("google")}
            >
              {sessionData ? "Sign out" : "Sign in"}
            </button>
          </div>
          <div className="flex flex-1 justify-evenly">
            <Tab name="Compose" path="/" />
            <Tab name="New Template" path="/add-template" />
            <Tab name="Edit Template" path="/edit-template" />
          </div>

          <div className="flex flex-1 justify-end">
            <p className="text-center text-xl font-light text-zinc-300">
              {sessionData ? (
                <span>{sessionData.user?.name}</span>
              ) : (
                <span>Not Logged In</span>
              )}
            </p>
          </div>
        </div>
        {sessionData ? (
          children
        ) : (
          <h1 className="mb-2 mt-auto mb-auto text-6xl font-bold">Sign in!</h1>
        )}
      </main>
    </>
  );
};

export default Layout;
