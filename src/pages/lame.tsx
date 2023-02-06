import { type NextPage } from "next";
import { signIn } from "next-auth/react";
import Image from "next/image";

const Lame: NextPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <main className="text-center">
        <Image
          src="/peanut.png"
          width={1306 / 4}
          height={1504 / 4}
          alt=""
          className="mx-auto"
        />

        <h1 className="mb-2 text-2xl">
          You need to be a TechCodes Exec to use this app!
        </h1>
        <p>If you are, login with your TechCodes email</p>

        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="mt-4 text-xl underline"
        >
          Sign in
        </button>
      </main>
    </div>
  );
};

export default Lame;
