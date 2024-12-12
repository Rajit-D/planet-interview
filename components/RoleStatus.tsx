"use client";

import { useRoleStore } from "@/app/_lib/roleStore";
import { useEffect, useState } from "react";

const RoleStatus = ({ roleId }: any) => {
  const expireRole = useRoleStore((state) => state.expireRole);
  const roles = useRoleStore((state) => state.roles);
  const role: any = roles.find((r) => r.id === roleId);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (role) {
      setIsExpired(role.expired);
    }
  }, [role]);

  return (
    <div>
      {isExpired === false ? (
        <span
          className="cursor-pointer py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500"
          onClick={() => {
            expireRole(roleId);
          }}
        >
          <svg
            className="shrink-0 size-5"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
            <path d="m9 12 2 2 4-4"></path>
          </svg>
          <p className="text-[15px]">Connected</p>
        </span>
      ) : (
        <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-red-100 text-red-800 rounded-full dark:bg-red-500/10 dark:text-red-500">
          <svg
            className="shrink-0 size-5"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
            <path d="M12 9v4"></path>
            <path d="M12 17h.01"></path>
          </svg>
          <p className="text-[15px]">Expired</p>
        </span>
      )}
    </div>
  );
};

export default RoleStatus;
