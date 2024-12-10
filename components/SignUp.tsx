"use client";

import supabase from "@/config/supabase";
import axios from "axios";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const SignUp = () => {
  const [orgName, setOrgName] = useState<string>("");
  const [orgEmail, setOrgEmail] = useState<string>("");
  const [orgPassword, setOrgPassword] = useState<string>("");
  const [orgCheckPass, setOrgCheckPass] = useState<string>("");
  const [orgUserLen, setOrgUserLen] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File>();
  const [orgAvatarImg, setOrgAvatarImg] = useState<string>("");
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();
  return (
    <div className="bg-gradient-to-r from-[#fc5c7d] to-[#6a82fb] relative overflow-hidden h-screen flex justify-center items-center">
      <div className="mx-auto w-full py-12 px-4 sm:px-6 md:py-20 lg:py-32 md:px-8 flex justify-center items-center">
        <div className="bg-black md:w-5/12 p-6 rounded-xl">
          <h1 className="text-3xl text-gray-800 font-bold md:text-4xl md:leading-tight lg:text-5xl lg:leading-tight dark:text-neutral-200">
            Solving problems for every{" "}
            <span className="text-blue-600 dark:text-blue-500">team</span>
          </h1>
          <p className="mt-3 text-base text-gray-500 dark:text-neutral-500">
            Built on standard web technology, teams use Preline to build
            beautiful cross-platform hybrid apps in a fraction of the time.
          </p>

          <div className="mt-5">
            <div className="mb-4">
              <label
                htmlFor="hs-hero-name-2"
                className="block text-sm font-medium dark:text-white"
              >
                <span className="sr-only">Name of the organisation</span>
              </label>
              <input
                type="text"
                id="hs-hero-name-2"
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                placeholder="Name of the organisation"
                onChange={(e) => {
                  setOrgName(e.target.value);
                }}
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="hs-hero-email-2"
                className="block text-sm font-medium dark:text-white"
              >
                <span className="sr-only">Email address</span>
              </label>
              <input
                type="email"
                id="hs-hero-email-2"
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                placeholder="Email address"
                onChange={(e) => {
                  setOrgEmail(e.target.value);
                }}
                required
              />
            </div>

            <div className="mb-4 grid grid-cols-2 gap-x-3">
              <div className="">
                <label
                  htmlFor="hs-hero-password-2"
                  className="block text-sm font-medium dark:text-white"
                >
                  <span className="sr-only">Password</span>
                </label>
                <input
                  type="password"
                  id="hs-hero-password-2"
                  className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Password"
                  onChange={(e) => {
                    setOrgPassword(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="">
                <label
                  htmlFor="hs-hero-password-2"
                  className="block text-sm font-medium dark:text-white"
                >
                  <span className="sr-only">Re-type Password</span>
                </label>
                <input
                  type="password"
                  id="hs-hero-password-2"
                  className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Re-type Password"
                  onChange={(e) => {
                    setOrgCheckPass(e.target.value);
                  }}
                  required
                />
              </div>
            </div>

            <div className="mb-4  grid grid-cols-3 gap-x-3">
              <div className="col-span-1">
                <label
                  htmlFor="hs-hero-name-2"
                  className="block text-sm font-medium dark:text-white"
                >
                  <span className="sr-only">Enter number of users</span>
                </label>
                <input
                  type="text"
                  id="hs-hero-name-2"
                  className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Number of users"
                  onChange={(e) => {
                    setOrgUserLen(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="file-input" className="sr-only">
                  Choose Avatar Image
                </label>
                <input
                  type="file"
                  name="file-input"
                  id="file-input"
                  className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
    file:bg-gray-50 file:border-0
    file:me-4
    file:py-3 file:px-4
    dark:file:bg-neutral-700 dark:file:text-neutral-400"
                  ref={imageInputRef}
                  onChange={(e) => {
                    setSelectedFile(e.target.files?.[0]);
                  }}
                />
              </div>
            </div>

            <div className="grid">
              <button
                type="submit"
                className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                onClick={async () => {
                  if (orgPassword === orgCheckPass) {
                    if (selectedFile) {
                      const filename = nanoid();

                      const { data, error } = await supabase.storage
                        .from("org-avatars")
                        .upload(
                          `${filename}.${selectedFile.name.split(".").pop()}`,
                          selectedFile
                        );

                      if (error) {
                        console.error("Error uploading file:", error.message);
                      } else {
                        const { data: file } = supabase.storage
                          .from("org-avatars")
                          .getPublicUrl(data.path);
                        setOrgAvatarImg(file.publicUrl);
                        const org = await axios.post(
                          "http://localhost:3000/api/org",
                          {
                            id: uuidv4(),
                            name: orgName,
                            email: orgEmail,
                            password: orgPassword,
                            adminNo: parseInt(orgUserLen),
                            avatar: file.publicUrl,
                          }
                        );
                        router.push(`/admins/${org.data.id}`);
                      }
                    }
                  } else window.alert("Wrong Password ⚠");
                }}
              >
                {orgAvatarImg ? "Loading...":"Sign up"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
