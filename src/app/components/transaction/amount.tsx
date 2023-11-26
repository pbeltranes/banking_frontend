import React from "react";
import { formatter } from "../../../lib/utils";
import { Currency } from "../../../lib/types";
interface Props {
  balance: number;
  currency: Currency;
}

const Amount: React.FC<Props> = ({ balance, currency }) => {
  return (
    <div className="relative flex place-items-center before:absolute   before:rounded-full before:bg-gradient-radial before:from-grey before:to-transparent before:blur-4xl before:content-[''] after:absolute   after:bg-gradient-conic  after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1] ">
      <p className="mt-6 flex items-baseline justify-center gap-x-2">
        <span className="text-5xl font-bold tracking-tight text-gray-900">
          {formatter(currency).format(balance)}
        </span>
        <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
          {currency}
        </span>
      </p>
    </div>
  );
};

export default Amount;
