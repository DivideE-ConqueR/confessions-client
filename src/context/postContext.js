import { createContext, useEffect, useState } from "react";
import { getPostLikesFromLS, setPostLikesToLS } from "../utils/localStorage";

export const PostContext = createContext(null);

export default function PostProvider({ children }) {
  const [postLikes, setPostLikes] = useState(getPostLikesFromLS);

  useEffect(() => {
    setPostLikesToLS(postLikes);
  }, [postLikes]);

  const addPostLike = (id) => {
    if (postLikes.findIndex((post) => post.id === id) === -1) {
      const newPostLikes = [...postLikes, { id, liked: true }];
      setPostLikes(newPostLikes);
    }
  };

  return (
    <PostContext.Provider value={{ postLikes, addPostLike }}>
      {children}
    </PostContext.Provider>
  );
}
