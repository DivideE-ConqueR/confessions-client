import { AvatarGenerator } from "random-avatar-generator";
import ReactHashtag from "react-hashtag";
import ReactTimeAgo from "react-time-ago";

export default function Comment({ comment }) {
  const generator = new AvatarGenerator();

  return (
    <div className="pt-4 pb-2 flex space-x-4 items-start">
      <img
        className="h-10 w-10"
        src={generator.generateRandomAvatar(comment.name)}
        width="2.5rem"
        height="2.5rem"
        loading="lazy"
        alt="avatar"
      />
      <div className="space-y-2">
        <div className="flex space-x-2">
          <h2
            data-after-content="·"
            className="font-semibold text-base dot__seperator"
          >
            {comment.name}
          </h2>
          <p className="text-gray-400/70">
            <ReactTimeAgo
              date={new Date(comment.createdAt).getTime()}
              locale="en-IN"
              timeStyle="mini-minute-now"
            />
          </p>
        </div>
        <p className="w-[75vw] whitespace-pre-wrap break-words">
          <ReactHashtag
            renderHashtag={(hashtagValue) => (
              <span className="text-blue-500">{hashtagValue}</span>
            )}
          >
            {comment.body}
          </ReactHashtag>
        </p>
      </div>
    </div>
  );
}
