"use client";

import { useRoleStore } from "@/app/_lib/roleStore";
import { useEffect, useState } from "react";

const ModifyRoleButton = ({ roleId }: any) => {
  const roles = useRoleStore((state) => state.roles);
  const role: any = roles.find((r) => r.id === roleId);
  const updateRole = useRoleStore((state) => state.updateRole);

  const [name, setName] = useState<any>("");
  const [skills, setSkills] = useState<any>("");
  const [experience, setExperience] = useState<any>(0);
  const [minATS, setMinATS] = useState<any>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (role) {
      setName(role.name);
      setSkills(role.skills);
      setExperience(role.experience);
      setMinATS(role.minATS);
    }
  }, [role]);
  return (
    <div className="edit">
      <button
        type="button"
        className="py-3 px-4 mr-6 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
        aria-haspopup="dialog"
        aria-expanded="false"
        aria-controls="hs-vertically-centered-modal"
        data-hs-overlay="#hs-vertically-centered-modal"
      >
        Edit role
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
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
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
                Edit role
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
                    New name of the role:
                  </label>
                  <input
                    type="name"
                    id="name"
                    name="name"
                    value={name}
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
                    Skills required:
                  </label>
                  <textarea
                    id="skills"
                    className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    rows={3}
                    name="skills"
                    placeholder="eg. HTML, CSS,..."
                    value={skills}
                    onChange={(e) => {
                      setSkills(e.target.value);
                    }}
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
                      name="experience"
                      id="experience"
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder=""
                      value={experience}
                      onChange={(e) => {
                        setExperience(parseInt(e.target.value));
                      }}
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
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder=""
                      value={minATS}
                      onChange={(e) => {
                        setMinATS(parseInt(e.target.value));
                      }}
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
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                    onClick={() => {
                      const updatedRole = {
                        id: role.id,
                        name,
                        skills,
                        experience,
                        minATS,
                        createdBy: role.createdBy,
                        expired: role.expired,
                        createdAt: role.createdAt,
                        updatedAt: function getFormattedTimestamp() {
                          const now = new Date();
                          const year = now.getFullYear();
                          const month = String(now.getMonth() + 1).padStart(
                            2,
                            "0"
                          );
                          const date = String(now.getDate()).padStart(2, "0");
                          const hours = String(now.getHours()).padStart(2, "0");
                          const minutes = String(now.getMinutes()).padStart(
                            2,
                            "0"
                          );
                          const seconds = String(now.getSeconds()).padStart(
                            2,
                            "0"
                          );
                          const milliseconds = String(
                            now.getMilliseconds()
                          ).padStart(3, "0");

                          return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}.${milliseconds}`;
                        },
                      };
                      updateRole(updatedRole);
                      setLoading(true);
                      setTimeout(() => {
                        console.log("Form submitted");
                        setLoading(false);
                      }, 1000);
                    }}
                  >
                    Update
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

export default ModifyRoleButton;
