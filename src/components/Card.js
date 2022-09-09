import { useState } from "react";
import { RWebShare } from "react-web-share";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  EllipsisHorizontalIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import ReactTimeAgo from "react-time-ago";
import { AvatarGenerator } from "random-avatar-generator";

export default function Card(props) {
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
          <p className="text-gray-600 text-base">{props.postBody}</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #photography
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #travel
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #winter
          </span>
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
          <ChatBubbleOvalLeftEllipsisIcon className="w-5 cursor-pointer" />
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
