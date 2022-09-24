export default function Input({ placeholder, value, onChange, onClick }) {
  return (
    <>
      <textarea
        type="textarea"
        rows="3"
        id="large-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="p-2.5 w-full text-sm bg-gray-50 rounded-lg border-2 border-gray-300 focus:ring focus:ring-green-500 focus:outline-none"
        placeholder={placeholder}
      />
      <button
        disabled={value.length === 0 ? true : false}
        onClick={value.length > 0 ? onClick : null}
        className="w-full p-2.5 text-sm font-medium rounded-lg text-white bg-green-500 hover:bg-green-600 focus:ring focus:ring-green-500 focus:outline-none cursor-pointer disabled:bg-green-300 disabled:cursor-not-allowed"
      >
        Submit
      </button>
    </>
  );
}
