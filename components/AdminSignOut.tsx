import axios from "axios";
import { redirect } from "next/navigation";
import React from "react";

const AdminSignOut = () => {
  return (
    <button
      type="button"
      className="py-3 px-4 ml-6 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-teal-100 text-teal-800 hover:bg-teal-200 focus:outline-none focus:bg-teal-200 disabled:opacity-50 disabled:pointer-events-none dark:text-teal-500 dark:bg-teal-800/30 dark:hover:bg-teal-800/20 dark:focus:bg-teal-800/20"
      onClick={async () => {
        await axios.get("http://localhost:3000/api/adminsignout");
        redirect("/");
      }}
    >
      Sign out
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
        />
      </svg>
    </button>
  );
};

export default AdminSignOut;
