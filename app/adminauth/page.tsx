"use client";
import { adminLogin } from "./actions";
import { useActionState } from "react";

const form = () => {
  const [state, formAction, pending] = useActionState(adminLogin, null);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-xs">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          action={formAction}
          method="POST"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="email"
              placeholder="Email ID"
            />
            {state?.errors?.email && (
              <p className="text-black">{state.errors.email}</p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              name="password"
              placeholder="*******"
            />
            {state?.errors?.password && (
              <p className="text-black">{state.errors.password}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              aria-disabled={pending}
            >
              {pending ? "Submitting..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default form;
