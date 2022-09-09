import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { WithContext as ReactTags } from "react-tag-input";
import axios from "../api/base";
import Navbar from "../components/Navbar";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export default function New() {
  const navigate = useNavigate();

  const [postBody, setPostBody] = useState("");
  const [tags, setTags] = useState([
    { id: "Thailand", text: "Thailand" },
    { id: "India", text: "India" },
    { id: "Vietnam", text: "Vietnam" },
    { id: "Turkey", text: "Turkey" },
  ]);

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

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
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

        <ReactTags
          tags={tags}
          // suggestions={suggestions}
          delimiters={delimiters}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          // handleDrag={handleDrag}
          // handleTagClick={handleTagClick}
          inputFieldPosition="bottom"
          // autocomplete
        />
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
