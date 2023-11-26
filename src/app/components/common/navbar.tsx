import React from "react";

interface Props {
  name?: string;
}

const Navbar: React.FC<Props> = ({ name = "" }) => {
  return (
    <div className="columns-2 max-w-5xl w-full items-center start-flex font-mono text-sm lg:flex">
      <p className="fixed flex justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        <code className="font-mono font-bold">Banking APP</code>
      </p>
      <a
        className="flex place-items-center pb-6 pt-8  lg:p-4"
        href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      ></a>
      <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none"></div>
    </div>
  );
};

export default Navbar;
