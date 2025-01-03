"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import Link from "next/link";

const CandidateRow = ({ candidateData }: any) => {
  const pathname = usePathname();
  const pathArray = pathname.split("/");

  return (
    <tr>
      <td className="size-px whitespace-nowrap">
        <div className="ps-6 py-3">
          <label htmlFor="hs-at-with-checkboxes-1" className="flex">
            <input
              type="checkbox"
              className="shrink-0 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
              id="hs-at-with-checkboxes-1"
            />
            <span className="sr-only">Checkbox</span>
          </label>
        </div>
      </td>
      <td className="size-px whitespace-nowrap">
        <div className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
          <div className="flex items-center gap-x-3">
            <Image
              width={80}
              height={80}
              className="rounded-full h-[40px] w-[40px]"
              src={candidateData.photo}
              alt="Avatar"
            />
            <div className="grow">
              <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">
                {candidateData.name}
              </span>
              <span className="block text-sm text-gray-500 dark:text-neutral-500">
                {candidateData.email}
              </span>
            </div>
          </div>
        </div>
      </td>
      <td className="h-px w-72 whitespace-nowrap">
        <div className="px-6 py-3">
          <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">
            {candidateData.phoneNo}
          </span>
        </div>
      </td>
      <td className="size-px whitespace-nowrap">
        <div className="px-4 py-3">
          {candidateData.selected === "pending" ? (
            <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full dark:bg-yellow-500/10 dark:text-yellow-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              pending
            </span>
          ) : candidateData.selected === "accept" ? (
            <span className="py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
              <svg
                className="shrink-0 size-3"
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
              selected
            </span>
          ) : (
            <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-red-100 text-red-800 rounded-full dark:bg-red-500/10 dark:text-red-500">
              <svg
                className="shrink-0 size-3"
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
              rejected
            </span>
          )}
        </div>
      </td>
      <td className="size-px whitespace-nowrap">
        <div className="px-6 py-3">
          <div className="flex items-center gap-x-3">
            <span className="text-xs text-gray-500 dark:text-neutral-500">
              {candidateData.country}
            </span>
          </div>
        </div>
      </td>
      <td className="size-px whitespace-nowrap">
        <div className="px-6 py-3">
          <span className="text-sm text-gray-500 dark:text-neutral-500">
            {candidateData.createdAt.split("T")[0]}
          </span>
        </div>
      </td>
      <td className="size-px whitespace-nowrap">
        <div className="px-6 py-1.5">
          <Link
            className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
            href={`/candidate/${pathArray[pathArray.length - 1]}/${
              candidateData.id
            }`}
            target="_blank"
          >
            View details
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default CandidateRow;
