import { AvatarGenerator } from "random-avatar-generator";
import { Linkify, LinkifyCore } from "react-easy-linkify";
import ReactTimeAgo from "react-time-ago";

LinkifyCore.PluginManager.enableMention();
LinkifyCore.PluginManager.enableHashtag();

export default function Comment({ comment }) {
  const generator = new AvatarGenerator();

  return (
    <div className="flex items-start space-x-4 pt-4 pb-2">
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
            className="dot__seperator text-base font-semibold"
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
          <Linkify
            options={{
              className: "text-blue-500",
              defaultProtocol: "https",
              linkWrapper: {
                mention: (props) => (
                  // Use 'Link' tag instead of 'span' tag
                  <span aria-label="mention" {...props}>
                    {props.children}
                  </span>
                ),
                hashtag: (props) => (
                  // Use 'Link' tag instead of 'span' tag
                  <span aria-label="hashtag" {...props}>
                    {props.children}
                  </span>
                ),
              },
              formatHref: {
                mention: (href) => `/user${href}`,
                hashtag: (href) => `/tag/${href.substring(1)}`,
              },
            }}
          >
            {comment.body}
          </Linkify>
        </p>
      </div>
    </div>
  );
}
