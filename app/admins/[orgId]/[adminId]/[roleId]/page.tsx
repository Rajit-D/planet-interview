"use client";

import { getBackendCookie } from "@/app/_lib/cookies";
import CandidateTable from "@/components/CandidateTable";
import DeleteRoleButton from "@/components/DeleteRoleButton";
import ModifyRoleButton from "@/components/ModifyRoleButton";
import RoleStatus from "@/components/RoleStatus";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Role {
  id: any;
  name: string;
  skills: string;
  experience: number;
  minATS: number;
  createdBy: any;
  createdAt: any;
  updatedAt: any;
}

const page = () => {
  const pathname = usePathname();
  const pathnameArray = pathname.split("/");
  const [roleInfo, setRoleInfo] = useState<Role>();
  const [candidatesInfo, setCandidatesInfo] = useState([]);

  useEffect(() => {
    const fetchInfo = async () => {
      const backendCookie = await getBackendCookie();
      const roleData: any = await axios.get(
        `http://localhost:8080/singleJobRole?id=${
          pathnameArray[pathnameArray.length - 1]
        }`,
        {
          headers: {
            Authorization: `Bearer ${backendCookie}`,
          },
        }
      );
      setRoleInfo(roleData.data);
      const candidateList: any = await axios.get(
        `http://localhost:8080/allCandidate?id=${
          pathnameArray[pathnameArray.length - 1]
        }`,
        {
          headers: {
            Authorization: `Bearer ${backendCookie}`,
          },
        }
      );
      setCandidatesInfo(candidateList.data);
    };
    fetchInfo();
  }, []);

  return (
    <div className="ml-[16.5rem] mt-5 flex w-full flex-col items-start">
      <div className="flex justify-center items-center w-full">
        <div className="flex items-start justify-center flex-col w-1/4 h-full ml-5 gap-y-3">
          <div className="">
            <p className="text-[50px] leading-[60px]">{roleInfo?.name}</p>
            <div className="mt-2">
              <RoleStatus roleId={roleInfo?.id} />
            </div>
          </div>
          <div className="flex justify-start">
            <ModifyRoleButton roleId={roleInfo?.id} />
            <DeleteRoleButton
              orgId={pathnameArray[pathnameArray.length - 3]}
              adminId={pathnameArray[pathnameArray.length - 2]}
              roleId={pathnameArray[pathnameArray.length - 1]}
            />
          </div>
        </div>
        <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto w-3/4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="flex flex-col gap-y-3 lg:gap-y-5 p-4 md:p-5 bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-800">
              <div className="inline-flex justify-center items-center">
                <span className="size-2 inline-block bg-gray-500 rounded-full me-2"></span>
                <span className="text-xs font-semibold uppercase text-gray-600 dark:text-neutral-400">
                  Submissions
                </span>
              </div>

              <div className="text-center">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-800 dark:text-neutral-200">
                  {candidatesInfo.length}
                </h3>
              </div>

              <dl className="flex justify-center items-center divide-x divide-gray-200 dark:divide-neutral-800">
                <dt className="pe-3">
                  <span className="text-green-600">
                    <svg
                      className="inline-block size-4 self-center"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"
                      />
                    </svg>
                    <span className="inline-block text-sm">1.7%</span>
                  </span>
                  <span className="block text-sm text-gray-500 dark:text-neutral-500">
                    change
                  </span>
                </dt>
                <dd className="text-start ps-3">
                  <span className="text-sm font-semibold text-gray-800 dark:text-neutral-200">
                    5
                  </span>
                  <span className="block text-sm text-gray-500 dark:text-neutral-500">
                    last week
                  </span>
                </dd>
              </dl>
            </div>
            <div className="flex flex-col gap-y-3 lg:gap-y-5 p-4 md:p-5 bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-800">
              <div className="inline-flex justify-center items-center">
                <span className="size-2 inline-block bg-green-500 rounded-full me-2"></span>
                <span className="text-xs font-semibold uppercase text-gray-600 dark:text-neutral-400">
                  Approved
                </span>
              </div>

              <div className="text-center">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-800 dark:text-neutral-200">
                  {
                    candidatesInfo.filter(
                      (candidate: any) => candidate.selected === "accept"
                    ).length
                  }
                </h3>
              </div>

              <dl className="flex justify-center items-center divide-x divide-gray-200 dark:divide-neutral-800">
                <dt className="pe-3">
                  <span className="text-green-600">
                    <svg
                      className="inline-block size-4 self-center"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"
                      />
                    </svg>
                    <span className="inline-block text-sm">5.6%</span>
                  </span>
                  <span className="block text-sm text-gray-500 dark:text-neutral-500">
                    change
                  </span>
                </dt>
                <dd className="text-start ps-3">
                  <span className="text-sm font-semibold text-gray-800 dark:text-neutral-200">
                    7
                  </span>
                  <span className="block text-sm text-gray-500 dark:text-neutral-500">
                    last week
                  </span>
                </dd>
              </dl>
            </div>

            <div className="flex flex-col gap-y-3 lg:gap-y-5 p-4 md:p-5 bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-800">
              <div className="inline-flex justify-center items-center">
                <span className="size-2 inline-block bg-red-500 rounded-full me-2"></span>
                <span className="text-xs font-semibold uppercase text-gray-600 dark:text-neutral-400">
                  Rejected
                </span>
              </div>

              <div className="text-center">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-800 dark:text-neutral-200">
                  {
                    candidatesInfo.filter(
                      (candidate: any) => candidate.selected === "reject"
                    ).length
                  }
                </h3>
              </div>

              <dl className="flex justify-center items-center divide-x divide-gray-200 dark:divide-neutral-800">
                <dt className="pe-3">
                  <span className="text-red-600">
                    <svg
                      className="inline-block size-4 self-center"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
                      />
                    </svg>
                    <span className="inline-block text-sm">5.6%</span>
                  </span>
                  <span className="block text-sm text-gray-500 dark:text-neutral-500">
                    change
                  </span>
                </dt>
                <dd className="text-start ps-3">
                  <span className="text-sm font-semibold text-gray-800 dark:text-neutral-200">
                    7
                  </span>
                  <span className="block text-sm text-gray-500 dark:text-neutral-500">
                    last week
                  </span>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <CandidateTable
        roleName={roleInfo?.name}
        roleId={pathnameArray[pathnameArray.length - 1]}
      />
    </div>
  );
};

export default page;
