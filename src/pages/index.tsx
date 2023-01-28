import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";
import Layout from "../components/layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <AuthShowcase />
    </Layout>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const submit = api.sendEmail.useMutation();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
      <button
        onClick={() =>
          submit.mutateAsync({
            to: "nirjhor@techcodes.org",
            subject: "Test Email",
            text: "This is a test email",
          })
        }
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
      >
        Send Test Email
      </button>
    </div>
  );
};
