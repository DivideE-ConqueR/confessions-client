import { AvatarGenerator } from "random-avatar-generator";
import ReactTimeAgo from "react-time-ago";

export default function Comment(props) {
  const generator = new AvatarGenerator();

  return (
    <div className="pt-4 pb-2 flex space-x-4">
      <img
        className="h-10 w-10"
        src={generator.generateRandomAvatar(props.name)}
        loading="lazy"
        alt="avatar"
      />
      <div>
        <div className="flex space-x-2">
          <p
            data-after-content="·"
            className="font-semibold text-base seperator"
          >
            {props.name}
          </p>
          <p className="text-gray-400/70">
            <ReactTimeAgo
              date={new Date(props.createdAt).getTime()}
              locale="en-IN"
              timeStyle="mini-minute-now"
            />
          </p>
        </div>
        <p className="whitespace-pre-wrap break-words">{props.comment}</p>
      </div>
    </div>
  );
}
