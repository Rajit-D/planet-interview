"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const session = useSession();
  return (
    <div className="h-screen">
      <div className="h-full flex justify-center items-center font-poppins">
        <div className="hero flex justify-center items-center flex-col">
          <h1 className="text-[70px] flex-wrap flex justify-center items-center flex-col leading-[4.5rem]">
            Welcome to
            <p className="font-semibold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
              Planet Interview
            </p>
          </h1>
          <div className="button grid grid-cols-3 gap-3">
            <Link href="/orgSignup">
              <button className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-lg mt-[50px] text-black font-semibold">
                Register your Organisation
              </button>
              <div className="">{JSON.stringify(session.data?.user)}</div>
            </Link>
            <Link href="/orgSignin">
              <button className="bg-gradient-to-r from-violet-500 to-fuchsia-500 p-3 rounded-lg mt-[50px] text-black font-semibold">
                Sign in with your Organisation
              </button>
              <div className="">{JSON.stringify(session.data?.user)}</div>
            </Link>
            <button
              className="bg-gradient-to-r from-violet-500 to-fuchsia-500 p-3 rounded-lg mt-[50px] text-black font-semibold"
              onClick={() => signOut()}
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
