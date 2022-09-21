import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RWebShare } from "react-web-share";
import ReactHashtag from "react-hashtag";
import ReactTimeAgo from "react-time-ago";
import { AvatarGenerator } from "random-avatar-generator";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  EllipsisHorizontalIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";

export default function Card(props) {
  const navigate = useNavigate();

  const [likesCount, setLikesCount] = useState(props.likes);
  const [dislikesCount, setDislikesCount] = useState(props.dislikes);

  const generator = new AvatarGenerator();

  const increment = () => {
    setLikesCount(likesCount + 1);
  };
  const decrement = () => {
    setDislikesCount(dislikesCount + 1);
  };

  return (
    <>
      <div className="rounded overflow-hidden shadow-md bg-white">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center space-x-2">
              <img
                className="w-8"
                src={generator.generateRandomAvatar(props.name)}
                loading="lazy"
                alt="avatar"
              />
              <h2 className="font-semibold text-base">{props.name}</h2>
              <p className="font-bold text-gray-300">·</p>
              <p className="text-gray-400/70">
                <ReactTimeAgo
                  date={props.createdAt}
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
              {props.postBody}
            </ReactHashtag>
          </p>
        </div>

        <div className="px-6 pt-3 pb-4 flex space-x-8 items-center">
          <div className="flex items-center space-x-2">
            <HandThumbUpIcon
              className="w-5 cursor-pointer"
              onClick={increment}
            />
            <span className="select-none">
              {likesCount !== 0 && likesCount}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <HandThumbDownIcon
              className="w-5 cursor-pointer"
              onClick={decrement}
            />
            <span className="select-none">
              {dislikesCount !== 0 && dislikesCount}
            </span>
          </div>
          <ChatBubbleOvalLeftEllipsisIcon
            className="w-5 cursor-pointer"
            onClick={() => {
              navigate(`/posts/${props.id}`);
            }}
          />
          <RWebShare
            data={{
              text: "Web Share - Confessions",
              url: "http://localhost:3000",
              title: "Confessions",
            }}
            onClick={() => console.log("shared successfully!")}
          >
            <ShareIcon className="w-5 cursor-pointer" />
          </RWebShare>
        </div>
      </div>
    </>
  );
}
