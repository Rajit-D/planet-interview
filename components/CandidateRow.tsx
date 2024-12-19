"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import Link from "next/link";

const CandidateRow = ({ candidateData }: any) => {
  const pathname = usePathname();
  const pathArray=pathname.split("/");

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
              height={38}
              width={38}
              className="inline-block size-[38px] rounded-full"
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
          <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full dark:bg-yellow-500/10 dark:text-yellow-500">
            <svg
              className="size-2.5"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </svg>
            Pending
          </span>
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
            {candidateData.createdAt}
          </span>
        </div>
      </td>
      <td className="size-px whitespace-nowrap">
        <div className="px-6 py-1.5">
          <Link
            className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
            href={`/candidate/${pathArray[pathArray.length-1]}/${candidateData.id}`}
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
