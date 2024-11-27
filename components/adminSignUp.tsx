"use client";

import supabase from "@/config/supabase";
import axios from "axios";
import { nanoid } from "nanoid";
import { useParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";

const AdminSignUp = () => {
  const [adminName, setAdminName] = useState<string>("");
  const [adminEmail, setAdminEmail] = useState<string>("");
  const [adminPassword, setAdminPassword] = useState<string>("");
  const [adminCheckPass, setAdminCheckPass] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File>();
  const [adminAvatarImg, setAdminAvatarImg] = useState<string>("");
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const params = useParams<{ orgId: string; tag: string; item: string }>();
  const { orgId } = params;

  const router = useRouter();
  return (
    <div className="flex items-center justify-center flex-col h-screen">
      Fill in the following credentials
      <div className="max-w-md mx-auto mt-5">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="name"
            name="org-name"
            id="org-name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
            required
            onChange={(e) => {
              setAdminName(e.target.value);
            }}
          />
          <label
            htmlFor="org-name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Name
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="floating_email"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
            required
            onChange={(e) => {
              setAdminEmail(e.target.value);
            }}
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email ID
          </label>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="floating_password"
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={(e) => {
                setAdminPassword(e.target.value);
              }}
            />
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="repeat_password"
              id="floating_repeat_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={(e) => {
                setAdminCheckPass(e.target.value);
              }}
            />
            <label
              htmlFor="floating_repeat_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Confirm password
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-1">
          <div className="max-w-lg mx-auto">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="user_avatar"
            >
              Upload Avatar
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="user_avatar_help"
              id="user_avatar"
              type="file"
              ref={imageInputRef}
              onChange={(e) => {
                setSelectedFile(e.target.files?.[0]);
              }}
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={async () => {
            if (adminPassword === adminCheckPass) {
              if (selectedFile) {
                const filename = nanoid();

                const { data, error } = await supabase.storage
                  .from("admin-avatars")
                  .upload(
                    `${filename}.${selectedFile.name.split(".").pop()}`,
                    selectedFile
                  );

                if (error) {
                  console.error("Error uploading file:", error.message);
                } else {
                  const { data: file } = supabase.storage
                    .from("admin-avatars")
                    .getPublicUrl(data.path);
                  setAdminAvatarImg(file.publicUrl);
                  const admin = await axios.post(
                    `http://localhost:3000/api/${orgId}`,
                    {
                      id: nanoid(),
                      name: adminName,
                      email: adminEmail,
                      password: adminPassword,
                      orgId,
                      adminAvatarImg: file.publicUrl,
                    }
                  );
                  console.log(admin);
                  router.push(`/admins/${orgId}`);
                  window.alert("Successful");
                }
              }
            } else window.alert("Wrong Password ⚠");
          }}
        >
          Submit
        </button>
        {adminAvatarImg && (
          <img src={adminAvatarImg} className="my-5 max-w-[100px]" />
        )}
      </div>
    </div>
  );
};

export default AdminSignUp;
