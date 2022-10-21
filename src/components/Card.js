import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RWebShare } from "react-web-share";
import ReactHashtag from "react-hashtag";
import ReactTimeAgo from "react-time-ago";
import { AvatarGenerator } from "random-avatar-generator";
import { usePost } from "../hooks/usePost";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  EllipsisHorizontalIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import {
  HandThumbUpIcon as HandThumbUpSolidIcon,
  HandThumbDownIcon as HandThumbDownSolidIcon,
} from "@heroicons/react/24/solid";

export default function Card(props) {
  const generator = new AvatarGenerator();

  const navigate = useNavigate();
  const {
    isPostLiked,
    addPostLike,
    removePostLike,
    addPostDislike,
    removePostDislike,
    isPostDisliked,
  } = usePost();

  const [postLiked, setPostLiked] = useState({ liked: null, synced: null });
  const [postDisliked, setPostDisliked] = useState({
    disliked: null,
    synced: null,
  });

  useEffect(() => {
    const likedRes = isPostLiked(props.id);
    const dislikedRes = isPostDisliked(props.id);
    likedRes
      ? setPostLiked({ liked: likedRes.liked, synced: likedRes.synced })
      : setPostLiked({ liked: false, synced: null });
    dislikedRes
      ? setPostDisliked({
          disliked: dislikedRes.disliked,
          synced: dislikedRes.synced,
        })
      : setPostDisliked({ disliked: false, synced: null });
  }, [isPostLiked, isPostDisliked, props.id]);

  const handlePostLike = () => {
    if (postLiked.liked !== true) {
      addPostLike(props.id);
      setPostLiked({ liked: true, synced: false });
    } else {
      removePostLike(props.id);
      setPostLiked({ liked: false, synced: null });
    }
  };

  const handlePostDislike = () => {
    if (postDisliked.disliked !== true) {
      addPostDislike(props.id);
      setPostDisliked({ disliked: true, synced: false });
    } else {
      removePostDislike(props.id);
      setPostDisliked({ disliked: false, synced: null });
    }
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
              <h2
                className="font-semibold text-base dot__seperator"
                data-after-content="·"
              >
                {props.name}
              </h2>
              <p className="text-gray-400/70">
                <ReactTimeAgo
                  date={new Date(props.createdAt).getTime()}
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
          <div
            className="flex items-center space-x-2 cursor-pointer hover:text-blue-500"
            onClick={handlePostLike}
          >
            {postLiked.liked ? (
              <HandThumbUpSolidIcon className="w-5 text-blue-500" />
            ) : (
              <HandThumbUpIcon className="w-5" />
            )}
            <span className="select-none">
              {postLiked.synced === false ? props.likes + 1 : props.likes}
            </span>
          </div>
          <div
            className="flex items-center space-x-2 cursor-pointer hover:text-yellow-500"
            onClick={handlePostDislike}
          >
            {postDisliked.disliked ? (
              <HandThumbDownSolidIcon className="w-5 text-yellow-500" />
            ) : (
              <HandThumbDownIcon className="w-5" />
            )}
            <span className="select-none">
              {postDisliked.synced === false
                ? props.dislikes + 1
                : props.dislikes}
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
              text: `Share - Confessions | ${props.name}`,
              url: `${window.location.origin}/posts/${props.id}`,
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
