import Navbar from "../components/Navbar";

export default function New() {
  return (
    <>
      <Navbar />

      <div className="p-4 space-y-6">
        <h1 className="font-medium text-center">
          Share your secret with the world
        </h1>
        <textarea
          id="message"
          rows="10"
          className="p-2.5 w-full text-sm bg-gray-50 rounded-lg border-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Your message..."
        />
        <button className="w-full p-2.5 text-sm font-medium text-white bg-blue-500 rounded-lg">
          Post
        </button>
      </div>
    </>
  );
}
