import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RWebShare } from "react-web-share";
import ReactHashtag from "react-hashtag";
import ReactTimeAgo from "react-time-ago";
import { AvatarGenerator } from "random-avatar-generator";
import { usePost } from "../hooks/usePost";
import Report from "./Report";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import {
  HandThumbUpIcon as HandThumbUpSolidIcon,
  HandThumbDownIcon as HandThumbDownSolidIcon,
} from "@heroicons/react/24/solid";

export default function Card({ post }) {
  const generator = new AvatarGenerator();

  const navigate = useNavigate();
  const {
    isPostLiked,
    addPostLike,
    removePostLike,
    addPostDislike,
    removePostDislike,
    isPostDisliked,
    isPostReported,
  } = usePost();

  const [postLiked, setPostLiked] = useState({ liked: null, synced: null });
  const [postDisliked, setPostDisliked] = useState({
    disliked: null,
    synced: null,
  });
  const [postReported, setPostReported] = useState({
    reported: null,
    synced: null,
  });

  useEffect(() => {
    const likedRes = isPostLiked(post._id);
    const dislikedRes = isPostDisliked(post._id);
    const reportedRes = isPostReported(post._id);
    likedRes
      ? setPostLiked({ liked: likedRes.liked, synced: likedRes.synced })
      : setPostLiked({ liked: false, synced: null });
    dislikedRes
      ? setPostDisliked({
          disliked: dislikedRes.disliked,
          synced: dislikedRes.synced,
        })
      : setPostDisliked({ disliked: false, synced: null });
    reportedRes
      ? setPostReported({
          reported: reportedRes.reported,
          synced: reportedRes.synced,
        })
      : setPostReported({ reported: false, synced: null });
  }, [isPostLiked, isPostDisliked, isPostReported, post._id]);

  const handlePostLike = () => {
    if (postLiked.liked !== true) {
      addPostLike(post._id);
      setPostLiked({ liked: true, synced: false });
    } else {
      removePostLike(post._id);
      setPostLiked({ liked: false, synced: null });
    }
  };

  const handlePostDislike = () => {
    if (postDisliked.disliked !== true) {
      addPostDislike(post._id);
      setPostDisliked({ disliked: true, synced: false });
    } else {
      removePostDislike(post._id);
      setPostDisliked({ disliked: false, synced: null });
    }
  };

  return (
    <>
      <div className="overflow-hidden rounded bg-white shadow-md">
        <div className="px-6 py-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img
                className="h-8 w-8"
                width="2rem"
                height="2rem"
                src={generator.generateRandomAvatar(post.name)}
                loading="lazy"
                alt="avatar"
              />
              <h2
                className="dot__seperator text-base font-semibold"
                data-after-content="·"
              >
                {post.name}
              </h2>
              <p className="text-gray-400/70">
                <ReactTimeAgo
                  date={new Date(post.createdAt).getTime()}
                  locale="en-IN"
                  timeStyle="mini-minute-now"
                />
              </p>
            </div>
            <Report
              id={post._id}
              postReported={postReported}
              setPostReported={setPostReported}
            />
          </div>
          <p className="whitespace-pre-line text-base text-gray-600">
            <ReactHashtag
              renderHashtag={(hashtagValue) => (
                <span className="text-blue-500 ">{hashtagValue}</span>
              )}
            >
              {post.body}
            </ReactHashtag>
          </p>
        </div>

        <div className="flex items-center space-x-8 px-6 pt-3 pb-4">
          <div
            className="flex cursor-pointer items-center space-x-2 hover:text-blue-500"
            onClick={handlePostLike}
          >
            {postLiked.liked ? (
              <HandThumbUpSolidIcon className="w-5 text-blue-500" />
            ) : (
              <HandThumbUpIcon className="w-5" />
            )}
            <span className="select-none">
              {postLiked.synced === false
                ? post.count.likes + 1
                : post.count.likes}
            </span>
          </div>
          <div
            className="flex cursor-pointer items-center space-x-2 hover:text-yellow-500"
            onClick={handlePostDislike}
          >
            {postDisliked.disliked ? (
              <HandThumbDownSolidIcon className="w-5 text-yellow-500" />
            ) : (
              <HandThumbDownIcon className="w-5" />
            )}
            <span className="select-none">
              {postDisliked.synced === false
                ? post.count.dislikes + 1
                : post.count.dislikes}
            </span>
          </div>
          <ChatBubbleOvalLeftEllipsisIcon
            className="w-5 cursor-pointer"
            onClick={() => {
              navigate(`/posts/${post._id}`);
            }}
          />
          <RWebShare
            data={{
              text: `Share - Confessions | ${post.name}`,
              url: `${window.location.origin}/posts/${post._id}`,
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
