"use client";

import { uploadFileToSupabase, validateCandidate } from "@/lib/utils";
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
  const [roleData, setRoleData] = useState({name: "", skills: "", experience: 0});
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
          `http://localhost:8080/formJobData?id=${roleId}`
        );
        setRoleData(res.data);
        setLoading(false);
      } catch (error) {
        router.push("/notfound");
      }
    };
    fetchData();
  }, [roleId]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    console.log(data);
    const photoUrl = await uploadFileToSupabase(photoFile, "candidate-photo");
    const cvUrl = await uploadFileToSupabase(cvFile, "candidate-cv");
    let uploadData: CandidateData = {
      ...data,
      photo: photoUrl,
      cv: cvUrl,
      jobRole: roleId,
    };
    if (!validateCandidate(uploadData)) {
      window.alert("some fields are empty");
      return;
    }
    try {
      await axios.post(
        "http://localhost:8080/submitForm",
        uploadData
      );
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
    <div className="flex justify-center items-center h-screen">
      <div role="status">
        <svg
          aria-hidden="true"
          className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
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
