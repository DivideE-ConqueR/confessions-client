import { useState } from "react";
import { CircularProgress } from "@mui/material";

export default function Input({ placeholder, value, onChange, onClick, rows }) {
  const [loading, setLoading] = useState(false);

  const handleOnClick = () => {
    setLoading(true);
    const timeOut = setTimeout(() => {
      onClick();
      onChange("");
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeOut);
  };

  return (
    <>
      <textarea
        type="textarea"
        rows={rows}
        id="large-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="p-2.5 w-full text-sm bg-gray-50 rounded-lg border-2 border-gray-300 focus:ring focus:ring-gray-600 focus:outline-none"
        placeholder={placeholder}
      />
      <button
        disabled={value.length === 0 && !loading ? true : false}
        onClick={handleOnClick}
        className="w-full p-2.5 text-sm font-medium rounded-lg text-white bg-gray-800 hover:bg-gray-600 focus:ring focus:ring-gray-500 focus:outline-none cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? <CircularProgress size={23} /> : "Post"}
      </button>
    </>
  );
}
