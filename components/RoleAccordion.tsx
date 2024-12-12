"use client";

import { getPayloadInfo } from "@/app/_lib/cookies";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRoleStore } from "@/app/_lib/roleStore";

type RoleType = {
  id: string;
  name: string;
  skills: string;
  experience: number;
  minATS: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

type PayloadInfoType = {
  adminId: string;
  adminName: string;
  adminEmail: string;
  adminAvatar: string;
  adminPosition: string;
  rolesByAdmin: RoleType[];
  orgId: string;
  orgName: string;
  orgEmail: string;
  orgAvatar: string;
};

type PayloadType = {
  payload: PayloadInfoType;
};

const RoleAccordion = () => {
  const roles = useRoleStore((state) => state.roles);
  const fetchRoles = useRoleStore((state) => state.fetchRoles);
  const [payloadData, setPayloadData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const payload: any = await getPayloadInfo();
      fetchRoles();
      setPayloadData(payload.userId);
    };
    fetchData();
  }, [fetchRoles]);

  if (!roles || roles.length === 0) {
    return (
      <p className="text-[12px] text-neutral-400 ml-5">No roles created yet.</p>
    );
  }

  return (
    <ul className="ps-2">
      {roles &&
        roles.map((role: any) => (
          <li key={role.id}>
            <Link
              href={`/admins/${payloadData.orgId}/${payloadData.adminId}/${role.id}`}
            >
              <p className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-neutral-800 focus:outline-none focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300">
                {role.name}
              </p>
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default RoleAccordion;
