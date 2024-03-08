import React, { useRef, useState } from "react";

interface UsernameFormProps {
  onSubmitUsername: (username: string) => void;
}

const UsernameForm: React.FC<UsernameFormProps> = ({ onSubmitUsername }) => {
  const [usernameErrorMsg, setUsernameErrorMsg] = useState<string>("");

  const usernameRef = useRef<HTMLInputElement>(null);

  /**
   * Handles form submission and performs input validation.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - the form event
   * @return {void}
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = usernameRef.current!.value;
    if (username.length < 3) {
      setUsernameErrorMsg("Username too short, min length = 3");
    } else {
      setUsernameErrorMsg("");
      usernameRef.current!.value = "";
      onSubmitUsername(username);
    }
  };

  return (
    <form
      className="flex flex-col items-center rounded px-8 pb-8 mb-4"
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="username"
        className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400"
      >
        Enter a username and start to chat with your friends!
      </label>
      <input
        placeholder="Type your username here..."
        name="username"
        className={`shadow appearance-none border rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          usernameErrorMsg?.length > 0 ? "border border-red-500" : ""
        }`}
        autoComplete="off"
        id="username"
        ref={usernameRef}
      />
      <button
        className={`flex items-center bg-blue-500 mt-4 hover:bg-blue-700 text-white py-2 px-4 rounded-lg `}
        type="submit"
      >
        <span>Enter chat </span>
        <svg
          className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </button>

      {usernameErrorMsg.length > 0 && (
        <span className="text-red-500 text-sm mt-4">{usernameErrorMsg}</span>
      )}
    </form>
  );
};

export default UsernameForm;
