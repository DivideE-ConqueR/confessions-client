import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";

export default function Input({
  label,
  placeholder,
  value,
  onChange,
  onClick,
  rows,
}) {
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
        className="p-2.5 w-full text-sm bg-gray-50 rounded-lg border-2 border-gray-300 focus:ring focus:ring-[#1856AD] focus:outline-none"
        placeholder={placeholder}
      />
      <button
        disabled={value.length === 0 && !loading ? true : false}
        onClick={handleOnClick}
        className="w-full h-12 p-2.5 text-sm font-medium rounded-lg text-white bg-[#1856AD] hover:bg-[#0F3460] focus:ring focus:ring-gray-500 focus:outline-none cursor-pointer disabled:bg-[#97D2EC] disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex justify-center">
            <ThreeDots
              height="30"
              width="30"
              radius="9"
              color="#fff"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          </span>
        ) : (
          label
        )}
      </button>
    </>
  );
}
