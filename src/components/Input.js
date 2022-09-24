export default function Input({ placeholder, value, onChange, onClick, rows }) {
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
        disabled={value.length === 0 ? true : false}
        onClick={onClick}
        className="w-full p-2.5 text-sm font-medium rounded-lg text-white bg-gray-800 hover:bg-gray-600 focus:ring focus:ring-gray-500 focus:outline-none cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Post
      </button>
    </>
  );
}
