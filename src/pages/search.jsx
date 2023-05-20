import { useState } from "react";
import { getSearchResults } from "../api/services/search";
import {
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Card from "../components/Card";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await getSearchResults(searchQuery).then((res) => res.data);
    setSearchResults(data);
    setLoading(false);
  };

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
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            required
          />
          <button
            type="submit"
            className="absolute right-2.5 bottom-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </form>

      {loading ? (
        <Loader />
      ) : (
        <div className="mt-6">
          {searchResults.length > 0 ? (
            searchResults.map((post) => <Card key={post._id} post={post} />)
          ) : (
            <div className="flex h-40 flex-col items-center justify-center space-y-4">
              <ExclamationTriangleIcon className="w-8 text-red-400" />
              <p className="font-[500] text-gray-700">No results!</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
