import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AvatarGenerator } from "random-avatar-generator";
import ReactTimeAgo from "react-time-ago";
import ReactHashtag from "react-hashtag";
import { RWebShare } from "react-web-share";
import { useErrorHandler } from "react-error-boundary";
import { getPost } from "../api/services/post";
import { createComment, getComments } from "../api/services/comment";
import { usePost } from "../hooks/usePost";
import { useAlert } from "../hooks/useAlert";
import Header from "../components/Header";
import Input from "../components/Input";
import Comment from "../components/Comment";
import Report from "../components/Report";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import {
  ChatBubbleLeftRightIcon,
  HandThumbUpIcon as HandThumbUpSolidIcon,
  HandThumbDownIcon as HandThumbDownSolidIcon,
} from "@heroicons/react/24/solid";

export default function Post() {
  const generator = new AvatarGenerator();

  const { id } = useParams();
  const queryClient = useQueryClient();
  const handleError = useErrorHandler();
  const {
    addPostLike,
    removePostLike,
    isPostLiked,
    addPostDislike,
    removePostDislike,
    isPostDisliked,
    isPostReported,
  } = usePost();
  const { openAlert } = useAlert();

  const [commentBody, setCommentBody] = useState("");
  const [postLiked, setPostLiked] = useState({ liked: null, synced: null });
  const [postDisliked, setPostDisliked] = useState({
    disliked: null,
    synced: null,
  });
  const [postReported, setPostReported] = useState({
    reported: null,
    synced: null,
  });

  const {
    data: post,
    isLoading: isPostLoading,
    isError: isPostError,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
    onError: (error) => handleError(error),
  });

  const {
    data: comments,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
  } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => getComments(id),
    onError: (error) => handleError(error),
  });

  useEffect(() => {
    const likedRes = isPostLiked(id);
    const dislikedRes = isPostDisliked(id);
    const reportedRes = isPostReported(id);
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
  }, [id, isPostLiked, isPostDisliked, isPostReported]);

  const handlePostLike = () => {
    if (postLiked.liked !== true) {
      addPostLike(post.data._id);
      setPostLiked({ liked: true, synced: false });
    } else {
      removePostLike(post.data._id);
      setPostLiked({ liked: false, synced: null });
    }
  };

  const handlePostDislike = () => {
    if (postDisliked.disliked !== true) {
      addPostDislike(post.data._id);
      setPostDisliked({ disliked: true, synced: false });
    } else {
      removePostDislike(post.data._id);
      setPostDisliked({ disliked: false, synced: null });
    }
  };

  const mutation = useMutation({
    mutationFn: () => {
      createComment({
        pid: id,
        body: commentBody,
        tags: [...new Set(commentBody.match(/(#+[a-zA-Z0-9(_)]{1,})/gi))],
      });
    },
    onSuccess: () => {
      openAlert({
        message: "Comment posted successfully!",
        severity: "success",
      });
      queryClient.invalidateQueries(["comments", id]);
    },
    onError: (error) => {
      openAlert({
        message: "Something went wrong!",
        severity: "error",
      });
      console.error(error.response.data);
    },
  });

  return (
    <>
      <Header />
      {isPostLoading || isCommentsLoading ? (
        <Loader />
      ) : (
        (!isPostError || !isCommentsError) && (
          <>
            <div className="px-6 py-4">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-2">
                  <img
                    className="w-8 h-8"
                    width="2rem"
                    height="2rem"
                    src={generator.generateRandomAvatar(post.data.name)}
                    loading="lazy"
                    alt="avatar"
                  />
                  <h2
                    className="font-semibold text-base dot__seperator"
                    data-after-content="·"
                  >
                    {post.data.name}
                  </h2>
                  <p className="text-gray-400/70">
                    <ReactTimeAgo
                      date={new Date(post.data.createdAt).getTime()}
                      locale="en-IN"
                      timeStyle="mini-minute-now"
                    />
                  </p>
                </div>
                <Report
                  id={id}
                  postReported={postReported}
                  setPostReported={setPostReported}
                />
              </div>
              <p className="text-gray-600 text-xl whitespace-pre-line break-words">
                <ReactHashtag
                  renderHashtag={(hashtagValue) => (
                    <span className="text-blue-500">{hashtagValue}</span>
                  )}
                >
                  {post.data.body}
                </ReactHashtag>
              </p>
            </div>
            <div className="px-6 pt-3 pb-4 flex justify-between items-center">
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
                  {postLiked.synced === false
                    ? post.data.count.likes + 1
                    : post.data.count.likes}
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
                    ? post.data.count.dislikes + 1
                    : post.data.count.dislikes}
                </span>
              </div>
              <ChatBubbleOvalLeftEllipsisIcon className="w-5 cursor-pointer" />
              <RWebShare
                data={{
                  text: `Share - Confessions | ${post.data.name}`,
                  url: `${window.location.origin}/posts/${post.data._id}`,
                  title: "Confessions",
                }}
                onClick={() => console.log("shared successfully!")}
              >
                <ShareIcon className="w-5 cursor-pointer" />
              </RWebShare>
            </div>
            <div className="p-3 mb-2 space-y-4">
              <Input
                value={commentBody}
                onChange={setCommentBody}
                onClick={() => mutation.mutate()}
                label="Comment"
                placeholder="Add your comment..."
                rows={3}
              />
            </div>

            <div
              data-before-content="All Comments"
              className="p-6 flex flex-col space-y-3 divide-y-2 before:content-[attr(data-before-content)] before:text-lg before:font-semibold before:mb-2 before:pb-2 before:border-b-2 before:border-gray-300"
            >
              {comments.data.length > 0 ? (
                comments.data.map((comment) => (
                  <Comment key={comment._id} comment={comment} />
                ))
              ) : (
                <div className="h-40 flex flex-col items-center justify-center space-y-4">
                  <ChatBubbleLeftRightIcon className="w-8 text-red-400" />
                  <p className="font-[500] text-gray-700">No Comments Yet!</p>
                  <p className="text-gray-600">
                    Be the first to share what you think!
                  </p>
                </div>
              )}
            </div>
          </>
        )
      )}
      <Footer />
    </>
  );
}
