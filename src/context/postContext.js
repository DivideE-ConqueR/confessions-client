import { createContext, useState } from "react";
import { postLikesGetter, postLikesSetter } from "../utils/localStorage";

export const PostContext = createContext(null);

export default function PostProvider({ children }) {
  const [postLikes, setPostLikes] = useState(postLikesGetter);

  const addLike = (id) => {
    if (postLikes.findIndex((post) => post.id === id) === -1) {
      const newPostLikes = [...postLikes, { id, liked: true }];
      setPostLikes(newPostLikes);
      postLikesSetter(postLikes);
    }
  };

  return (
    <PostContext.Provider value={{ postLikes, addLike }}>
      {children}
    </PostContext.Provider>
  );
}
