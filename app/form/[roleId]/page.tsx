"use client";

import { uploadFileToSupabase, validateCandidate } from "@/lib/utils";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export type CandidateData = {
  name: string;
  email: string;
  phoneNo: string;
  photo: string;
  gender: string;
  country: string;
  cv: string;
  dob: string;
  highestDegree: string;
  highestDegreeOrg: string;
  highestDegreeCGPA: number;
  yog: string;
  prevEmployer: string;
  experience: number;
  prevJobTitle: string;
  duration: string;
  isEmployed: boolean;
  skills: string;
  referralCode: string;
  referralName: string;
  links: string;
  jobRole: string | string[] | undefined;
};

const roleForm = () => {
  const { roleId } = useParams();
  const router = useRouter();
  const [roleData, setRoleData] = useState({
    name: "",
    skills: "",
    experience: 0,
    expired: false,
  });
  const [formExpired, setFormExpired] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [photoFile, setPhotoFile] = useState<File>();
  const [cvFile, setCvFile] = useState<File>();
  const [data, setData] = useState<CandidateData>({
    name: "",
    email: "",
    phoneNo: "",
    photo: "",
    country: "",
    cv: "",
    dob: "",
    gender: "Male",
    highestDegree: "",
    highestDegreeOrg: "",
    highestDegreeCGPA: 0,
    yog: "",
    prevEmployer: "",
    experience: 0,
    prevJobTitle: "",
    duration: "",
    isEmployed: false,
    skills: "",
    referralCode: "",
    referralName: "",
    links: "",
    jobRole: "",
  });

  useEffect(() => {
    setSubmitted(false);
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_PATH}/formJobData?id=${roleId}`
        );
        setRoleData(res.data);
        if (res.data.expired) {
          setFormExpired(true);
        }
        setLoading(false);
      } catch (error) {
        router.push("/notfound");
      }
    };
    fetchData();
  }, [roleId]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const photoUrl = await uploadFileToSupabase(photoFile, "candidate-photo");
    const cvUrl = await uploadFileToSupabase(cvFile, "candidate-cv");
    let uploadData = {
      ...data,
      photo: photoUrl,
      cv: cvUrl,
      jobRole: roleId,
      roleName: roleData.name,
    };
    if (!validateCandidate(uploadData)) {
      window.alert("some fields are empty");
      return;
    }
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_PATH}/submitForm`, uploadData);
    } catch (error) {
      window.alert(error);
      return;
    }
    setData({
      name: "",
      email: "",
      phoneNo: "",
      photo: "",
      country: "",
      cv: "",
      dob: "",
      gender: "Male",
      highestDegree: "",
      highestDegreeOrg: "",
      highestDegreeCGPA: 0,
      yog: "",
      prevEmployer: "",
      experience: 0,
      prevJobTitle: "",
      duration: "",
      isEmployed: false,
      skills: "",
      referralCode: "",
      referralName: "",
      links: "",
      jobRole: "",
    });
    setSubmitted(true);
  };

  return loading ? (
    <div className="flex items-center justify-center h-screen">
      <DotLottieReact
        src="https://lottie.host/fda9334c-2ffe-427d-a24c-7bdf3531ed09/ocmy6FGYYA.lottie"
        loop
        autoplay
        style={{ width: "300px", height: "300px" }}
      />
    </div>
  ) : formExpired ? (
    <div className="size-full flex justify-center items-center fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto">
      <div className="mt-7 opacity-100 duration-500  ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
        <div className="relative flex flex-col bg-white shadow-lg rounded-xl dark:bg-neutral-900">
          <div className="p-4 sm:p-10 text-center overflow-y-auto">
            <span className="mb-4 inline-flex justify-center items-center size-[46px] rounded-full border-4 text-red-500 dark:bg-red-700 dark:border-red-400">
              <svg
                className=" shrink-0 size-10"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 345.8 345.8"
                enableBackground="new 0 0 345.8 345.8"
                xmlSpace="preserve"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <g>
                    {" "}
                    <circle
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="0.75"
                      strokeMiterlimit="10"
                      cx="172.9"
                      cy="172.9"
                      r="172.5"
                    ></circle>{" "}
                    <circle
                      fill="#E1473F"
                      cx="172.9"
                      cy="172.9"
                      r="172.5"
                    ></circle>{" "}
                    <circle
                      fill="#FF5F57"
                      cx="172.9"
                      cy="172.9"
                      r="157.5"
                    ></circle>{" "}
                    <g>
                      {" "}
                      <path
                        fill="#752521"
                        d="M160.4,80.4c5.7-5.3,12.4-8,20.1-8c7.8,0,14.5,2.7,20.1,8c5.6,5.3,8.3,11.7,8.3,19.3 c0,3.7-0.8,9.3-2.3,16.6c-1.6,7.4-3.3,14.9-5.1,22.6c-2.1,8.4-4.4,18.8-7,31.2c-2.6,12.4-5.4,27.9-8.3,46.6h-11.3 c-2.9-18.5-5.7-34-8.3-46.5c-2.6-12.5-5-23-7-31.4c-2.1-8.9-3.9-16.6-5.3-23.2c-1.4-6.6-2.1-11.9-2.1-15.9 C151.9,92.1,154.7,85.7,160.4,80.4z M160.6,242.2c5.6-5.4,12.2-8.1,19.7-8.1c7.6,0,14.2,2.7,19.8,8.1c5.6,5.4,8.4,11.8,8.4,19.3 c0,7.4-2.8,13.8-8.4,19.1c-5.6,5.3-12.2,8-19.8,8c-7.5,0-14.1-2.7-19.7-8c-5.6-5.3-8.4-11.7-8.4-19.1 C152.2,254.1,155,247.6,160.6,242.2z"
                      ></path>{" "}
                    </g>{" "}
                    <g>
                      {" "}
                      <path
                        fill="#FFFFFF"
                        d="M152.9,72.8c5.7-5.3,12.4-8,20.1-8c7.8,0,14.5,2.7,20.1,8c5.6,5.3,8.3,11.7,8.3,19.3 c0,3.7-0.8,9.3-2.3,16.6c-1.6,7.4-3.3,14.9-5.1,22.6c-2.1,8.4-4.4,18.8-7,31.2c-2.6,12.4-5.4,27.9-8.3,46.6h-11.3 c-2.9-18.5-5.7-34-8.3-46.5c-2.6-12.5-5-23-7-31.4c-2.1-8.9-3.9-16.6-5.3-23.2c-1.4-6.6-2.1-11.9-2.1-15.9 C144.4,84.5,147.2,78.1,152.9,72.8z M153.1,234.6c5.6-5.4,12.2-8.1,19.7-8.1c7.6,0,14.2,2.7,19.8,8.1c5.6,5.4,8.4,11.8,8.4,19.3 c0,7.4-2.8,13.8-8.4,19.1c-5.6,5.3-12.2,8-19.8,8c-7.5,0-14.1-2.7-19.7-8c-5.6-5.3-8.4-11.7-8.4-19.1 C144.7,246.5,147.5,240,153.1,234.6z"
                      ></path>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>
              </svg>
            </span>
            <h3 className="mb-2 text-xl font-bold text-gray-800 dark:text-neutral-200">
              Application stopped accepting responses
            </h3>
            <p className="text-gray-500 dark:text-neutral-500">
              contact the admin
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : submitted ? (
    <div className="size-full flex justify-center items-center fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto">
      <div className="mt-7 opacity-100 duration-500  ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
        <div className="relative flex flex-col bg-white shadow-lg rounded-xl dark:bg-neutral-900">
          <div className="p-4 sm:p-10 text-center overflow-y-auto">
            <span className="mb-4 inline-flex justify-center items-center size-[46px] rounded-full border-4 border-green-50 bg-green-100 text-green-500 dark:bg-green-700 dark:border-green-600 dark:text-green-100">
              <svg
                className="shrink-0 size-10"
                width="165px"
                height="165px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M4.89163 13.2687L9.16582 17.5427L18.7085 8"
                    stroke="#40be27"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>{" "}
                </g>
              </svg>
            </span>
            <h3 className="mb-2 text-xl font-bold text-gray-800 dark:text-neutral-200">
              Application successfully submitted!
            </h3>
            <p className="text-gray-500 dark:text-neutral-500">
              for further information keep checking your email
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 mx-auto">
      <div className="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-neutral-800">
        <div className="mb-8 items-center">
          <h2 className="text-xl font-bold text-gray-800 dark:text-neutral-200">
            {roleData.name}
          </h2>
          <p className="text-sm text-gray-600 dark:text-neutral-400">
            Skills: {roleData.skills}
          </p>
          <p className="text-sm text-gray-600 dark:text-neutral-400">
            Experience: {roleData.experience} years
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="af-account-email"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
              >
                Photo
              </label>
            </div>
            <div className="sm:col-span-9">
              <label
                htmlFor="af-submit-application-resume-cv"
                className="sr-only"
              >
                Choose file
              </label>
              <input
                type="file"
                name="af-submit-application-resume-cv"
                accept=".jpg,.jpeg,.png"
                id="af-submit-application-resume-cv"
                className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:text-neutral-400
                file:border-0
                file:bg-gray-100 file:me-4
                file:py-2 file:px-4
                dark:file:bg-neutral-700 dark:file:text-neutral-400"
                onChange={(e) => {
                  setPhotoFile(e.target.files?.[0]);
                }}
              />
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="af-account-full-name"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
              >
                Full name
              </label>
            </div>
            <div className="sm:col-span-9">
              <div className="sm:flex">
                <input
                  id="af-account-full-name"
                  type="text"
                  className="py-2 px-3 pe-11 block w-full border border-white shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:text-neutral-200 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="John Doe"
                  required
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="af-account-email"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
              >
                Email
              </label>
            </div>

            <div className="sm:col-span-9">
              <input
                id="af-account-email"
                type="email"
                className="py-2 px-3 pe-11 block w-full border border-white shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:text-neutral-200 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                placeholder="johndoe@gmail.com"
                required
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="af-account-email"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
              >
                Phone
              </label>
            </div>

            <div className="sm:col-span-9">
              <input
                id="af-account-phone"
                type="text"
                className="py-2 px-3 pe-11 block w-full border border-white shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:text-neutral-200 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                placeholder="+91 1234567890"
                required
                onChange={(e) => setData({ ...data, phoneNo: e.target.value })}
              />
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="af-account-email"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
              >
                Date of Birth
              </label>
            </div>

            <div className="sm:col-span-9">
              <input
                id="af-account-dob"
                type="date"
                className="py-2 px-3 pe-11 block w-full border border-white shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:text-neutral-200 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                required
                onChange={(e) => setData({ ...data, dob: e.target.value })}
              />
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="af-account-country"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
              >
                Country
              </label>
            </div>

            <div className="sm:col-span-9">
              <input
                id="af-account-country"
                type="text"
                className="py-2 px-3 pe-11 block w-full border border-white shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:text-neutral-200 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                placeholder="Ex: India"
                required
                onChange={(e) => setData({ ...data, country: e.target.value })}
              />
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="af-account-email"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
              >
                Upload Cv
              </label>
            </div>
            <div className="sm:col-span-9">
              <label
                htmlFor="af-submit-application-resume-cv"
                className="sr-only"
              >
                Choose file
              </label>
              <input
                type="file"
                name="af-submit-application-resume-cv"
                accept="application/pdf"
                id="af-submit-application-resume-cv"
                className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:text-neutral-400
                file:border-0
                file:bg-gray-100 file:me-4
                file:py-2 file:px-4
                dark:file:bg-neutral-700 dark:file:text-neutral-400"
                onChange={(e) => setCvFile(e.target.files?.[0])}
              />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="af-account-is-employed"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
              >
                Gender
              </label>
            </div>
            <div className="sm:col-span-9">
              <select
                id="af-account-is-employed"
                className="py-2 px-3 pe-11 block w-full border border-white shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:text-neutral-200 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                required
                onChange={(e) => setData({ ...data, gender: e.target.value })}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Rajit</option>
              </select>
            </div>
          </div>
          <hr className="mt-8" />
          <div className="mt-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-neutral-200">
              Qualification
            </h2>
          </div>
          <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="af-account-highest-degree"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
              >
                Highest Degree
              </label>
            </div>

            <div className="sm:col-span-9">
              <input
                id="af-account-highest-degree"
                type="text"
                className="py-2 px-3 pe-11 block w-full border border-white shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:text-neutral-200 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                onChange={(e) =>
                  setData({ ...data, highestDegree: e.target.value })
                }
              />
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="af-account-highest-degree"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
              >
                Institution Name
              </label>
            </div>

            <div className="sm:col-span-9">
              <input
                id="af-account-highest-degree"
                type="text"
                className="py-2 px-3 pe-11 block w-full border border-white shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:text-neutral-200 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                onChange={(e) =>
                  setData({ ...data, highestDegreeOrg: e.target.value })
                }
              />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="af-account-highest-degree-cgpa"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
              >
                CGPA
              </label>
            </div>

            <div className="sm:col-span-9">
              <input
                id="af-account-highest-degree-cgpa"
                type="number"
                step="0.01"
                max={10}
                min={0}
                className="py-2 px-3 pe-11 block w-full border border-white shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:text-neutral-200 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                onChange={(e) =>
                  setData({
                    ...data,
                    highestDegreeCGPA: parseFloat(e.target.value),
                  })
                }
              />
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="af-account-yog"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
              >
                Year of Graduation
              </label>
            </div>

            <div className="sm:col-span-9">
              <input
                id="af-account-yog"
                type="text"
                className="py-2 px-3 pe-11 block w-full border border-white shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:text-neutral-200 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                onChange={(e) => setData({ ...data, yog: e.target.value })}
              />
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="af-account-employeer"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
              >
                Previous Employeer
              </label>
            </div>

            <div className="sm:col-span-9">
              <input
                id="af-account-employeer"
                type="text"
                className="py-2 px-3 pe-11 block w-full border border-white shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:text-neutral-200 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                onChange={(e) =>
                  setData({ ...data, prevEmployer: e.target.value })
                }
              />
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="af-account-prev-job-title"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
              >
                Job Title
              </label>
            </div>

            <div className="sm:col-span-9">
              <input
                id="af-account-prev-job-title"
                type="text"
                className="py-2 px-3 pe-11 block w-full border border-white shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:text-neutral-200 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                onChange={(e) =>
                  setData({ ...data, prevJobTitle: e.target.value })
                }
              />
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="af-account-duration"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
              >
                Duration
              </label>
            </div>

            <div className="sm:col-span-9">
              <input
                id="af-account-duration"
                type="text"
                className="py-2 px-3 pe-11 block w-full border border-white shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:text-neutral-200 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                onChange={(e) => setData({ ...data, duration: e.target.value })}
              />
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="af-account-experience"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
              >
                Experience
              </label>
            </div>

            <div className="sm:col-span-9">
              <input
                id="af-account-experience"
                type="number"
                min={0}
                className="py-2 px-3 pe-11 block w-full border border-white shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:text-neutral-200 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                onChange={(e) =>
                  setData({ ...data, experience: parseInt(e.target.value) })
                }
              />
            </div>
          </div>
          <hr className="mt-8" />
          <div className="mt-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-neutral-200">
              About You
            </h2>
          </div>
          <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="af-account-is-employed"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
              >
                Employment Status
              </label>
            </div>
            <div className="sm:col-span-9">
              <select
                id="af-account-is-employed"
                className="py-2 px-3 pe-11 block w-full border border-white shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:text-neutral-200 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                defaultValue={"No"}
                onChange={(e) => {
                  const temp = e.target.value === "Yes";
                  setData({ ...data, isEmployed: temp });
                }}
              >
                <option>No</option>
                <option>Yes</option>
              </select>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="af-account-skills"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
              >
                Skills
              </label>
            </div>

            <div className="sm:col-span-9">
              <textarea
                id="af-account-skills"
                className="py-2 px-3 pe-11 block w-full border border-white shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:text-neutral-200 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                rows={3}
                placeholder="java,go,c++"
                onChange={(e) => setData({ ...data, skills: e.target.value })}
              />
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="af-account-prev-referral-code"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
              >
                Referal Code
              </label>
            </div>

            <div className="sm:col-span-9">
              <input
                id="af-account-prev-referral-code"
                type="text"
                className="py-2 px-3 pe-11 block w-full border border-white shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:text-neutral-200 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                onChange={(e) =>
                  setData({ ...data, referralCode: e.target.value })
                }
              />
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="af-account-prev-referral-name"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
              >
                Referral Name
              </label>
            </div>

            <div className="sm:col-span-9">
              <input
                id="af-account-prev-referral-name"
                type="text"
                className="py-2 px-3 pe-11 block w-full border border-white shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:text-neutral-200 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                onChange={(e) =>
                  setData({ ...data, referralName: e.target.value })
                }
              />
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="af-account-links"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
              >
                Links
              </label>
            </div>

            <div className="sm:col-span-9">
              <textarea
                id="af-account-links"
                className="py-2 px-3 pe-11 block w-full border border-white shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:text-neutral-200 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                rows={4}
                placeholder="https://github.com/Kunal-deve1oper"
                onChange={(e) => setData({ ...data, links: e.target.value })}
              />
            </div>
          </div>

          <div className="mt-5 flex justify-center gap-x-2">
            <button
              type="submit"
              className="py-3 px-7 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default roleForm;
