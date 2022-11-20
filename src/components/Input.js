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
        className="w-full rounded-lg border-2 border-gray-300 bg-gray-50 p-2.5 text-sm focus:outline-none focus:ring focus:ring-primary"
        placeholder={placeholder}
      />
      <button
        disabled={value.length === 0 && !loading ? true : false}
        onClick={handleOnClick}
        className="h-12 w-full cursor-pointer rounded-lg bg-primary p-2.5 text-sm font-medium text-white hover:bg-secondary focus:outline-none focus:ring focus:ring-gray-500 disabled:cursor-not-allowed disabled:bg-primary_light"
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
