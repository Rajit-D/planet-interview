import ModifyRoleButton from "@/components/ModifyRoleButton";
import { PrismaClient } from "@prisma/client";
import React from "react";

const client = new PrismaClient();

const page = async ({ params }: { params: any }) => {
  const { roleId } = await params;
  const roleInfo = await client.roles.findUnique({
    where: {
      id: roleId,
    },
  });
  return (
    <div className="mx-6 mt-5 flex w-screen items-start">
      <div className="flex justify-center items-center w-full">
        <div className="flex items-start flex-col w-1/4 h-full ml-5 gap-y-3">
          <div className="">
            <p className="text-[50px] leading-[60px]">{roleInfo?.name}</p>
            <div className="mt-2">
              <span className="py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
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
                <p className="text-[15px]">Active</p>
              </span>
            </div>
          </div>
          <ModifyRoleButton />
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
                  150
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
                  25
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
                  4
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
    </div>
  );
};

export default page;
