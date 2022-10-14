import { createContext, useEffect, useState } from "react";
import { getFromLS, setToLS } from "../utils/localStorage";

export const PostContext = createContext(null);

export default function PostProvider({ children }) {
  const [postLikes, setPostLikes] = useState(getFromLS("postLikes"));
  const [postUnlikes, setPostUnlikes] = useState(getFromLS("postUnlikes"));

  useEffect(() => {
    setToLS("postLikes", postLikes);
    setToLS("postUnlikes", postUnlikes);
  }, [postLikes, postUnlikes]);

  const addPostLike = (id) => {
    // if (postLikes.findIndex((post) => post.id === id) === -1) {
    const newPostUnlikes = postUnlikes.filter((post) => post.id !== id);
    setPostUnlikes(newPostUnlikes);
    const newPostLikes = [...postLikes, { id, liked: true, synced: false }];
    setPostLikes(newPostLikes);
    // return true;
    // }
    // return false;
  };

  const removePostLike = (id) => {
    const newPostLikes = postLikes.filter((post) => post.id !== id);
    setPostLikes(newPostLikes);
    const newPostUnlikes = [
      ...postUnlikes,
      { id, liked: false, synced: false },
    ];
    setPostUnlikes(newPostUnlikes);
  };

  const isPostLiked = (id) => {
    return postLikes.find((post) => post.id === id);
  };

  return (
    <PostContext.Provider
      value={{ postLikes, addPostLike, removePostLike, isPostLiked }}
    >
      {children}
    </PostContext.Provider>
  );
}
