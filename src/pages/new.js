// import { TagPicker } from "rsuite";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/base";
import Navbar from "../components/Navbar";

export default function New() {
  // const data = [
  //   "Eugenia",
  //   "Bryan",
  //   "Linda",
  //   "Nancy",
  //   "Lloyd",
  //   "Alice",
  //   "Julia",
  //   "Albert",
  // ].map((item) => ({
  //   label: item,
  //   value: item,
  //   role: Math.random() > 0.5 ? "Owner" : "Guest",
  // }));
  const navigate = useNavigate();

  const [postBody, setPostBody] = useState("");

  const handleClick = async () => {
    const IPAddress = await axios
      .get(
        "https://geolocation-db.com/json/d802faa0-10bd-11ec-b2fe-47a0872c6708"
      )
      .then((response) => response.data.IPv4)
      .catch((err) => console.log(err));
    await axios
      .post("/posts", {
        postBody: postBody,
        IPAddress: IPAddress,
      })
      .then(() => console.log("posted"))
      .catch((err) => console.log(err));
    navigate("/");
  };

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
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
          className="p-2.5 w-full text-sm bg-gray-50 rounded-lg border-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Your message..."
        />
        {/* <div>
          <TagPicker
            creatable
            data={data}
            style={{ width: 300 }}
            menuStyle={{ width: 300 }}
            onCreate={(value, item) => {
              console.log(value, item);
            }}
          />
        </div> */}
        <button
          onClick={handleClick}
          className="w-full p-2.5 text-sm font-medium text-white bg-blue-500 rounded-lg"
        >
          Post
        </button>
      </div>
    </>
  );
}
