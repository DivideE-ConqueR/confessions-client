import { useState } from "react";
import Header from "../components/Header";
import { useQuery } from "@tanstack/react-query";
import { getSearchResults } from "../api/services/search";

export default function Search() {
  const [query, setQuery] = useState();

  const submit = (e) => {
    e.preventDefault();
  };

  const q = useQuery({
    queryKey: ["search"],
    queryFn: getSearchResults,
  });

  return (
    <>
      <Header />

      <form className="px-6">
        <label
          htmlFor="default-search"
          className="sr-only mb-2 text-sm font-medium text-gray-900"
        >
          Search
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              aria-hidden="true"
              className="h-5 w-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
          <button
            type="submit"
            className="absolute right-2.5 bottom-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
            onClick={submit}
          >
            Search
          </button>
        </div>
      </form>
    </>
  );
}
