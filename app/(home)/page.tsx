"use client";

import HomeLoginButton from "@/components/HomeLoginButton";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "framer-motion";
import { FaGlobe } from "react-icons/fa6";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getBackendCookie } from "../_lib/cookies";
import { jwtDecode } from "jwt-decode";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface UserDataType {
  id: string;
  name: string;
  email: string;
  orgId: string;
  orgName: string;
}

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const backendCookie = await getBackendCookie();

        if (!backendCookie || typeof backendCookie !== "string") {
          console.log("Invalid or missing cookie");
          setLoading(false);
          return;
        }

        const userInfo = jwtDecode<UserDataType>(backendCookie);
        const { status } = await axios.get("/api/check-session");

        if (status === 200) {
          setUser(userInfo);
          setIsAuthenticated(true);
        }
      } catch (error: any) {
        if (error.response) {
          console.log("Error Response:", error.response.data);
        } else {
          console.log("Error:", error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, []);

  useEffect(() => {
    if (isAuthenticated && user) {
      router.push(`/admins/${user.userId.orgId}/${user.userId.id}`);
    }
  }, [isAuthenticated, user, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <DotLottieReact
          src="https://lottie.host/fda9334c-2ffe-427d-a24c-7bdf3531ed09/ocmy6FGYYA.lottie"
          loop
          autoplay
          style={{ width: "300px", height: "300px" }}
        />
      </div>
    );
  }

  if (!isAuthenticated) {
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
                    <button className="bg-gradient-to-r from-[#e6dada] to-[#274046] font-poppins p-[14px] w-[200px] flex items-center justify-evenly font-bold text-lg rounded-lg active:border-white duration-300 active:text-white">
                      Register <FaGlobe />
                    </button>
                  </Link>
                  <HomeLoginButton />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AuroraBackground>
    );
  }
  return null;
}
