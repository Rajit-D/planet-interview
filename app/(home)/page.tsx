"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const session = useSession();
  console.log(JSON.stringify(session.data?.user));
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="h-full flex justify-center items-center font-poppins">
          <div className="hero flex justify-center items-center flex-col">
            <h1 className="text-[70px] flex-wrap flex justify-center items-center flex-col leading-[4.5rem] text-white">
              Welcome to
              <p className="font-semibold bg-gradient-to-r from-[#43c6ac] to-[#f8ffae] inline-block text-transparent bg-clip-text">
                Planet Interview
              </p>
            </h1>
            <div className="button grid grid-cols-2 gap-3">
              <Link href="/orgSignup">
                <button className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-lg mt-[50px] text-black font-semibold">
                  Register your Organisation
                </button>
              </Link>
              <Link href="/orgSignin">
                <button className="bg-gradient-to-r from-violet-500 to-fuchsia-500 p-3 rounded-lg mt-[50px] text-black font-semibold">
                  Sign in with your Organisation
                </button>
              </Link>
              <button
                className="bg-gradient-to-r from-violet-500 to-fuchsia-500 p-3 rounded-lg mt-[50px] text-black font-semibold"
                onClick={() => signOut()}
              >
                Sign out
              </button>
              <Link href="/adminauth">
                <button className="bg-gradient-to-r from-violet-500 to-fuchsia-500 p-3 rounded-lg mt-[50px] text-black font-semibold">
                  Admin Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}
