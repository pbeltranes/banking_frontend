"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Toast from "../components/common/toaster";
import Amount from "../components/transaction/amount";
import { INCOME, MAX_AMOUNT, OUTCOME } from "../../lib/constants";
import { formatter, isNumeric } from "../../lib/utils";
import { Currency } from "../../lib/types";

export default function Home() {
  const [state, setState] = useState({
    type: "",
    amount: 10000.0,
    account_id: 0,
  });
  const router = useRouter();
  const [balance, setBalance] = useState(10000.0);
  const [currency, setCurrency] = useState<"MXN" | "CLP">("MXN");
  const [succesMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/get-cookies", {
        method: "GET",
      });
      const { account_id, balance } = await response.json();
      if (!account_id) router.push("/");
      setState({ ...state, account_id });
      setBalance(Number(balance));
    };

    fetchData();
  }, []);


  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(event.target.value as Currency);
  };

  const radioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, type: event.target.id });
  };

  const formAmoutChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const { id, value } = event.target;
    if (isNumeric(value) === false) {
      setErrorMessage(`Ingress valid values`);
      return;
    }
    if (MAX_AMOUNT < Number(value)) {
      setErrorMessage(
        `You can ingress amounts least than ${formatter(currency).format(
          MAX_AMOUNT
        )}`
      );
      return;
    }
    setState({ ...state, amount: Number(value) });
    setErrorMessage(null);
  };

  const formSubmit = async (event: React.MouseEvent) => {
    setLoading(true);
    const { type, amount, account_id } = state;
    const newBalance =
      type === OUTCOME ? balance - Number(amount) : balance + Number(amount);

    if (newBalance < 0) {
      setErrorMessage("You don't have enough money");
      setLoading(false);
      return;
    }
    if (newBalance > MAX_AMOUNT) {
      setErrorMessage("Your balance is too high, please contact executive");
      setLoading(false);
      return;
    }

    const response = await fetch("/api/transaction", {
      method: "POST",
      body: JSON.stringify({ balance: newBalance, ...state, account_id }),
    });
    if (response.status === 200) {
      setBalance(newBalance);
      setState({ ...state, amount: 0 });
      setSuccessMessage("Operation was successful");
      setLoading(false);
    }
  };

  return (
    <>
      <Amount balance={balance} currency={currency} />
      <div>
        <div className="space-y-12">
          <div className="border-t border-gray-900/10 pt-12">
            {errorMessage && (
              <Toast
                type="error"
                description={errorMessage}
                setMessage={setErrorMessage}
              />
            )}
            {succesMessage && (
              <Toast
                type="success"
                description={succesMessage}
                setMessage={setSuccessMessage}
              />
            )}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                New operation
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="text"
                  value={state.amount}
                  name="amount"
                  id="amount"
                  onChange={formAmoutChange}
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="1000.00"
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <label className="sr-only">Currency</label>
                  <select
                    onChange={onChange}
                    id="currency"
                    name="currency"
                    className="h-full rounded-md border-0 bg-transparent py-0 pl-4  pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  >
                    <option>MXN</option>
                    <option>CLP</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-10 space-y-10">
              <fieldset>
                <div className="mt-6 flex flex-row place-content-evenly">
                  <div className="flex items-center gap-x-3">
                    <input
                      id={INCOME}
                      name={INCOME}
                      type="radio"
                      checked={state.type === INCOME}
                      onChange={radioChange}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      INCOME
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id={OUTCOME}
                      name={OUTCOME}
                      type="radio"
                      checked={state.type === OUTCOME}
                      onChange={radioChange}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      OUTCOME
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          {loading ? (
            <button
              disabled
              type="button"
              className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
            >
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
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
                  fill="#1C64F2"
                />
              </svg>
              Procesing...
            </button>
          ) : (
            <button
              onClick={formSubmit}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Make operation
            </button>
          )}
        </div>
      </div>
    </>
  );
}
