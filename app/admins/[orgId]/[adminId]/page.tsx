"use client";

import { getPayloadInfo } from "@/app/_lib/cookies";
import { useRoleStore } from "@/app/_lib/roleStore";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Dashboard = () => {
  const [payload, setPayload] = useState<any>(null);
  const [name, setName] = useState<string>("");
  const [skills, setSkills] = useState<string>("");
  const [experience, setExperience] = useState<number>(0);
  const [minATS, setMinATS] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const addRole = useRoleStore((state) => state.addRole);

  useEffect(() => {
    const fetchData = async () => {
      const payloadInfo: any = await getPayloadInfo();
      setPayload(payloadInfo);
    };
    fetchData();
  }, []);

  return (
    <div className="flex items-start justify-end w-screen">
      <button
        type="button"
        className="py-3 px-4 mt-5 mr-5 md:w-[124px] inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
        aria-haspopup="dialog"
        aria-expanded="false"
        aria-controls="hs-vertically-centered-modal"
        data-hs-overlay="#hs-vertically-centered-modal"
      >
        Add Role{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
      <div
        id="hs-vertically-centered-modal"
        className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
        role="dialog"
        tabIndex={-1}
        aria-labelledby="hs-vertically-centered-modal-label"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
          <div className="w-full flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
            <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
              <h3
                id="hs-vertically-centered-modal-label"
                className="font-bold text-gray-800 dark:text-white"
              >
                About the role
              </h3>
              <button
                type="button"
                className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                aria-label="Close"
                data-hs-overlay="#hs-vertically-centered-modal"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="shrink-0 size-4"
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
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto">
              <form>
                <div className="max-w-full">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2 dark:text-white"
                  >
                    Name of the role:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="XYZ Specialist"
                  />
                </div>
                <div className="max-w-full mt-3">
                  <label
                    htmlFor="skills"
                    className="block text-sm font-medium mb-2 dark:text-white"
                  >
                    Skill required:
                  </label>
                  <textarea
                    id="skills"
                    name="skills"
                    onChange={(e) => {
                      setSkills(e.target.value);
                    }}
                    className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    rows={3}
                    placeholder="eg. HTML, CSS,..."
                  ></textarea>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="mt-3">
                    <label
                      htmlFor="experience"
                      className="block text-sm font-medium mb-2 dark:text-white"
                    >
                      Experience required:
                    </label>
                    <input
                      type="number"
                      id="experience"
                      name="experience"
                      onChange={(e) => {
                        setExperience(parseInt(e.target.value));
                      }}
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder=""
                    />
                  </div>
                  <div className="mt-3">
                    <label
                      htmlFor="minATS"
                      className="block text-sm font-medium mb-2 dark:text-white"
                    >
                      ATS score required:
                    </label>
                    <input
                      type="number"
                      id="minATS"
                      name="minATS"
                      onChange={(e) => {
                        setMinATS(parseInt(e.target.value));
                      }}
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder=""
                    />
                  </div>
                </div>
                <div className="flex justify-end items-center gap-x-2 py-3 pl-4 mt-3 border-t dark:border-neutral-700">
                  <button
                    type="button"
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                    data-hs-overlay="#hs-vertically-centered-modal"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                    onClick={() => {
                      const roleData = {
                        id: uuidv4(),
                        name,
                        skills,
                        experience,
                        minATS,
                        createdBy: payload.userId.adminId,
                      };
                      addRole(roleData);
                      setLoading(true);
                      setTimeout(() => {
                        console.log("Form submitted");
                        setLoading(false);
                      }, 1000);
                    }}
                  >
                    {loading ? "Creating..." : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
