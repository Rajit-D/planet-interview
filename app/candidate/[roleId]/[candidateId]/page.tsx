import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface candidateInfoType {
  country: string;
  createdAt: string;
  cv: string;
  dob: string;
  duration: string;
  email: string;
  experience: number;
  gender: string;
  highestDegree: string;
  highestDegreeCGPA: number;
  id: string;
  isEmployed: boolean;
  jobRole: string;
  links: string;
  name: string;
  phoneNo: string;
  photo: string;
  prevEmployer: string;
  prevJobTitle: string;
  referralCode: string;
  referralName: string;
  selected: boolean;
  skills: string;
  updatedAt: string;
  yog: string;
}

const client = new PrismaClient();

const page = async ({ params }: any) => {
  const candidateInfo: any = await client.candidates.findUnique({
    where: {
      id: params.candidateId,
    },
  });

  return (
    <div className="h-screen container mx-auto p-4 space-y-8 font-poppins bg-[#423E3B] flex justify-center items-center">
      <div className="w-[70%] mx-auto bg-black shadow-md rounded-lg px-6 py-2">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 ">
          <div className="flex items-center space-x-4">
            <Image
              src={candidateInfo.photo}
              alt={candidateInfo.name}
              width={80}
              height={80}
              className="rounded-full h-[80px] w-[80px]"
            />
            <div>
              <h1 className="text-2xl font-bold">{candidateInfo.name}</h1>
              {candidateInfo.prevJobTitle && (
                <p className="text-sm text-gray-500">
                  {candidateInfo.prevJobTitle}
                </p>
              )}
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              // onClick={handleAccept}
              className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-teal-100 text-teal-800 hover:bg-teal-200 focus:outline-none focus:bg-teal-200 disabled:opacity-50 disabled:pointer-events-none dark:text-teal-500 dark:bg-teal-800/30 dark:hover:bg-teal-800/20 dark:focus:bg-teal-800/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
              Accept
            </button>
            <button
              // onClick={handleReject}
              className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-100 text-red-800 hover:bg-red-200 focus:outline-none focus:bg-red-200 disabled:opacity-50 disabled:pointer-events-none dark:text-red-500 dark:bg-red-800/30 dark:hover:bg-red-800/20 dark:focus:bg-red-800/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
              Reject
            </button>
          </div>
        </div>
        <div className="p-4 space-y-6">
          <div>
            <h2 className="text-lg font-semibold">Personal Information</h2>
            <ul className="space-y-2 mt-4 grid grid-cols-2">
              <li className="flex items-center">
                <span className="font-bold mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                </span>
                <p className="font-light">{candidateInfo.email}</p>
              </li>
              <li className="flex items-center">
                <span className="font-medium mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                  </svg>
                </span>
                <p className="font-light">{candidateInfo.phoneNo}</p>
              </li>
              <li className="flex items-center">
                <span className="font-medium mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>
                </span>
                <p className="font-light">{candidateInfo.country}</p>
              </li>
              <li className="flex items-center">
                <span className="font-medium mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z"
                    />
                  </svg>
                </span>
                <p className="font-light">{candidateInfo.dob}</p>
              </li>
              <li className="flex items-center">
                <span className="font-medium mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </span>
                <p className="font-light">{candidateInfo.gender}</p>
              </li>
              <li className="flex items-center">
                <span className="font-medium mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                    />
                  </svg>
                </span>
                <p className="font-light">
                  {candidateInfo.isEmployed ? "Employed" : "Unemployed"}
                </p>
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-2">
            <div>
              <h2 className="text-lg font-semibold">Work Experience</h2>
              {candidateInfo.prevJobTitle ? (
                <div className="mt-4">
                  <strong>Previous Job Title:</strong>
                  <p className="font-light">{candidateInfo.previousJobTitle}</p>
                  <br />
                  <strong>Employer:</strong>{" "}
                  <p className="font-light">{candidateInfo.previousEmployer}</p>
                  <br />
                  <strong>Duration:</strong>{" "}
                  <p className="font-light">{candidateInfo.duration}</p>
                  <br />
                  <strong>Total Work Experience:</strong>
                  <p className="font-light">{candidateInfo.workExperience}</p>
                </div>
              ) : (
                <span className="mt-2 inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-white/10 text-white">
                  Not provided
                </span>
              )}
            </div>
            <div>
              <h2 className="text-lg font-semibold">Education</h2>
              <div className="mt-4">
                <div className="flex">
                  <strong>Highest Degree:</strong>{" "}
                  <p className="font-light ml-2">
                    {candidateInfo.highestDegree}
                  </p>
                </div>
                <div className="flex">
                  <strong>GPA:</strong>{" "}
                  <p className="font-light ml-2">
                    {candidateInfo.highestDegreeCGPA}
                  </p>
                </div>
                <div className="flex">
                  <strong>Graduation Year:</strong>
                  <p className="font-light ml-2">{candidateInfo.yog}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 mt-3">
            <div>
              <h2 className="text-lg font-semibold">Skills</h2>
              <div className="flex flex-wrap gap-2 mt-4">
                {candidateInfo.skills
                  .split(",")
                  .map((skill: any, index: any) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-lg text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500"
                    >
                      {skill}
                    </span>
                  ))}
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Referral Information</h2>
              {candidateInfo.referralCode ? (
                <div className="mt-4">
                  <strong>Referral Code:</strong> {candidateInfo.referralCode}
                  <strong>Referral Name:</strong> {candidateInfo.referralName}
                </div>
              ) : (
                <span className="mt-2 inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-white/10 text-white">
                  Not provided
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div>
              <h2 className="text-lg font-semibold">Social Media</h2>
              <div className="flex space-x-4 mt-4">
                <a
                  // href={candidateInfo.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  // href={candidateInfo.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
                <a
                  // href={candidateInfo.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </div>
            </div>
            <div>
              <Link
                href={candidateInfo.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:bg-gray-600 disabled:opacity-50 disabled:pointer-events-none"
              >
                View CV
              </Link>
              <button className="ml-3 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-100 text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-white/10 dark:text-neutral-400 dark:hover:bg-white/20 dark:hover:text-neutral-300 dark:focus:bg-white/20 dark:focus:text-neutral-300">
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
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
