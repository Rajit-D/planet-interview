"use client";
import { adminLogin } from "./actions";
import { useActionState } from "react";

const form = () => {
  const [state, formAction, pending] = useActionState(adminLogin, null);

  return (
    <div className="min-h-screen bg-[#191716] flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-[#212227] p-8 rounded-xl shadow-xl border border-gray-700">
        <div className="text-center">
          <div className="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-12 text-purple-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
              />
            </svg>
          </div>
          <h2 className="mt-4 text-3xl font-bold text-white">Admin Portal</h2>
          <p className="mt-2 text-sm text-gray-400">
            Sign in to your admin account
          </p>
        </div>
        <form className="mt-8 space-y-6" action={formAction}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors
                           placeholder-gray-500"
                  placeholder="admin@company.com"
                />
                {state?.errors?.email && (
                  <p className="text-black text-sm font-light">
                    {state.errors.email}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors
                           placeholder-gray-500"
                  placeholder="••••••••"
                />
                {state?.errors?.password && (
                  <p className="text-black text-sm font-light">
                    {state.errors.password}
                  </p>
                )}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium 
                     text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                     focus:ring-purple-500 transition-colors focus:ring-offset-gray-800"
            aria-disabled={pending}
          >
            {pending ? "Submitting..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-400">
          Need help?{" "}
          <a
            href="#"
            className="font-medium text-purple-400 hover:text-purple-300 transition-colors"
          >
            Contact support
          </a>
        </p>
      </div>
    </div>
  );
};

export default form;
