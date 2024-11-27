import React, { useState } from "react";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { IoPersonCircleSharp } from "react-icons/io5";
import { FaGlobe } from "react-icons/fa6";
import Link from "next/link";

const HomeLoginButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative flex flex-col items-center w-[200px] rounded-xl">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-gradient-to-r from-[#f3904f] to-[#ffd670] font-poppins p-3 w-full flex items-center justify-evenly font-bold text-lg rounded-lg active:border-white duration-300 active:text-white"
      >
        Login
        {!isOpen ? (
          <AiOutlineCaretDown className="h-8" />
        ) : (
          <AiOutlineCaretUp className="h-8" />
        )}
      </button>
      {isOpen && (
        <div className="bg-gradient-to-r from-[#f3904f] to-[#ffd670] absolute top-[60px] rounded-xl">
          <Link href="/orgSignin">
            <div className="mx-3 py-2 w-[175px] flex items-center justify-between">
              as Organisation <FaGlobe />
            </div>
          </Link>
          <Link href="/adminauth">
            <div className="mx-3 py-2 pb-3 w-[175px] flex items-center justify-between">
              as Admin <IoPersonCircleSharp className="text-[20px]" />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomeLoginButton;
