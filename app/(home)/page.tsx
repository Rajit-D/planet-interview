"use client";

import HomeLoginButton from "@/components/HomeLoginButton";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { FaGlobe } from "react-icons/fa6";
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
        <div className="">
          <div className="flex justify-center items-center font-poppins h-screen w-full">
            <div className="hero flex justify-center items-center flex-col">
              <h1 className="text-[70px] flex-wrap flex justify-center items-center flex-col leading-[4.5rem] text-white">
                Welcome to
                <p className="font-semibold bg-gradient-to-r from-[#fc5c7d] to-[#6a82fb] inline-block text-transparent bg-clip-text">
                  Planet Interview
                </p>
              </h1>
              <div className="flex justify-evenly items-center h-full w-full mt-7">
                <Link href="/orgSignup">
                  <button className="bg-gradient-to-r from-[#f3904f] to-[#ffd670] font-poppins p-[14px] w-[200px] flex items-center justify-evenly font-bold text-lg rounded-lg active:border-white duration-300 active:text-white">
                    Register <FaGlobe />
                  </button>
                </Link>
                <HomeLoginButton />
                {/* <button
                  className="bg-gradient-to-r from-violet-500 to-fuchsia-500 p-3 rounded-lg mt-[50px] text-black font-semibold"
                  onClick={() => signOut()}
                >
                  Sign out
                </button>
                 */}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}
