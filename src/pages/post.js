import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AvatarGenerator } from "random-avatar-generator";
import axios from "../api/base";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  EllipsisHorizontalIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import ReactTimeAgo from "react-time-ago";
import ReactHashtag from "react-hashtag";
import { RWebShare } from "react-web-share";
import Navbar from "../components/Navbar";
import Comment from "../components/Comment";
import Input from "../components/Input";

export default function Post() {
  const generator = new AvatarGenerator();

  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [commentBody, setCommentBody] = useState("");

  useEffect(() => {
    async function getPost() {
      const [postResponse, commentResponse] = await Promise.all([
        axios.get(`/posts/${id}`).then((res) => res.data),
        axios.get(`/comments/${id}`).then((res) => res.data),
      ]);
      setPost(postResponse);
      setComments(commentResponse);
      setLoading(false);
    }
    getPost();
  }, [id]);

  const handleClick = async () => {
    await axios
      .post("/comments", {
        comment: commentBody,
        postId: post.postId,
      })
      .then(() => {
        // handleAlertOpen({
        //   message: "Post created successfully!",
        //   severity: "success",
        // });
        console.log("commented");
      })
      .catch((err) => {
        // handleAlertOpen({
        //   message: "Something went wrong!",
        //   severity: "error",
        // });
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="px-6 py-4">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center space-x-2">
                <img
                  className="w-8"
                  src={generator.generateRandomAvatar(post.name)}
                  loading="lazy"
                  alt="avatar"
                />
                <h2 className="font-semibold text-base">{post?.name}</h2>
                <p className="font-bold text-gray-300">·</p>
                <p className="text-gray-400/70">
                  <ReactTimeAgo
                    date={new Date(post.createdAt).getTime()}
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
                  <span className="text-blue-500">{hashtagValue}</span>
                )}
              >
                {post.postBody}
              </ReactHashtag>
            </p>
          </div>
          <div className="px-6 pt-3 pb-4 flex space-x-8 items-center">
            <div className="flex items-center space-x-2">
              <HandThumbUpIcon
                className="w-5 cursor-pointer"
                // onClick={increment}
              />
              <span className="select-none">{post.likes}</span>
            </div>
            <div className="flex items-center space-x-2">
              <HandThumbDownIcon
                className="w-5 cursor-pointer"
                // onClick={decrement}
              />
              <span className="select-none">{post.dislikes}</span>
            </div>
            <ChatBubbleOvalLeftEllipsisIcon className="w-5 cursor-pointer" />
            <RWebShare
              data={{
                text: `Share - Confessions | ${post.name}`,
                url: `/posts/${post.postId}`,
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
              onClick={handleClick}
              placeholder="Add your comment..."
              rows={3}
            />
          </div>
          <div
            data-before-content="All Comments"
            className="p-6 flex flex-col space-y-3 divide-y-2 before:content-[attr(data-before-content)] before:text-lg before:font-semibold before:mb-2 before:pb-2 before:border-b-2 before:border-gray-300"
          >
            {comments.map((comment) => (
              <Comment
                key={comment._id}
                comment={comment.comment}
                name={comment.name}
                createdAt={comment.createdAt}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}
