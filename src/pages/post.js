import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AvatarGenerator } from "random-avatar-generator";
import axios from "../api/base";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import Navbar from "../components/Navbar";
import ReactTimeAgo from "react-time-ago";
import ReactHashtag from "react-hashtag";

export default function Post() {
  const generator = new AvatarGenerator();

  const { id } = useParams();

  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPost() {
      const response = await axios.get(`/posts/${id}`).then((res) => res.data);
      setPost(response);
      setLoading(false);
    }
    getPost();
  }, [id]);

  return (
    <>
      <Navbar />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="px-6 py-4">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center space-x-2">
              <img
                className="w-8"
                src={generator.generateRandomAvatar(post?.name)}
                loading="lazy"
                alt="avatar"
              />
              <h2 className="font-semibold text-base">{post?.name}</h2>
              <p className="font-bold text-gray-300">·</p>
              <p className="text-gray-400/70">
                <ReactTimeAgo
                  date={new Date(post?.createdAt).getTime()}
                  locale="en-IN"
                  timeStyle="mini-minute-now"
                />
              </p>
            </div>
            <EllipsisHorizontalIcon className="w-6 text-gray-500" />
          </div>
          <p className="text-gray-600 text-base whitespace-pre-line">
            <ReactHashtag
              renderHashtag={(hashtagValue) => (
                <span className="text-blue-500 ">{hashtagValue}</span>
              )}
            >
              {post?.postBody}
            </ReactHashtag>
          </p>
        </div>
      )}
    </>
  );
}
