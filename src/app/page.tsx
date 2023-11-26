"use client"
import { useState } from "react";
import Toast from "./components/common/toaster";
import { useRouter } from "next/navigation";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { Validation } from "../lib/constants";

export default function Home({ account_id }: { account_id: string }) {
  const router = useRouter();
  const [state, setState] = useState({
    name: "",
    accountNumber: 0,
    balance: 0,
    currency: "MXN",
  });

  const [error, setError] = useState<string | null>(null);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    event.preventDefault();
    const { id, value } = event.target;
    const validation = Validation[id];
    if (validation) {
      const { regex, message } = validation;
      const isValid = regex.every((r) => r.test(value));
      if (!isValid) {
        setError(message);
        return;
      }
      setState({ ...state, [event.target.id]: event.target.value });
      setError(null);
    }
  };

  const formSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch("/api/account", {
      method: "POST",
      body: JSON.stringify(state),
    });
    router.push("/transaction");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <CurrencyDollarIcon className="animate-bounce mx-auto h-20 w-auto text-green-500" />

          <p className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
            Sign in to your account
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium leading-6">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="first name"
                  required
                  onChange={onChange}
                  className="block w-full p-4 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <p>{account_id}</p>
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6">
                  Account number
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="account_number"
                  name="account_number"
                  type="text"
                  required
                  onChange={onChange}
                  className="block w-full rounded-md p-4 border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Initial balance
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="text"
                  name="price"
                  id="initial_balance"
                  onChange={onChange}
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="0.00"
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <label htmlFor="currency" className="sr-only">
                    Currency
                  </label>
                  <select
                    id="currency"
                    name="currency"
                    onChange={onChange}
                    className="h-full rounded-md border-0 bg-transparent py-0 pl-4  pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  >
                    <option>MXN</option>
                    <option>CLP</option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              <button
                type="submit"
                onClick={formSubmit}
                className="flex w-full justify-center rounded-md bg-green-600 mb-10 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </div>

          {error && <Toast type="error" description={error} setMessage={setError} />}
        </div>
      </div>
    </div>
  );
}
