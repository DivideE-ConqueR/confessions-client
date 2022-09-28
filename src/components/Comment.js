import { AvatarGenerator } from "random-avatar-generator";
import ReactTimeAgo from "react-time-ago";

export default function Comment(props) {
  const generator = new AvatarGenerator();

  return (
    <div className="p-4 flex space-x-4">
      <div>
        <img
          className="h-10 w-10"
          src={generator.generateRandomAvatar(props.name)}
          loading="lazy"
          alt="avatar"
        />
      </div>
      <div>
        <div className="flex space-x-2">
          <p className="font-semibold text-base">{props.name}</p>
          <p className="font-bold text-gray-300">·</p>
          <p className="text-gray-400/70">
            <ReactTimeAgo
              date={props.createdAt}
              locale="en-IN"
              timeStyle="mini-minute-now"
            />
          </p>
        </div>
        <p className="whitespace-pre-wrap">{props.comment}</p>
      </div>
    </div>
  );
}
