import { createContext, useEffect, useState } from "react";
import { getFromLS, setToLS } from "../utils/localStorage";

export const PostContext = createContext(null);

export default function PostProvider({ children }) {
  const [postLikes, setPostLikes] = useState(getFromLS("postLikes"));
  const [postUnlikes, setPostUnlikes] = useState(getFromLS("postUnlikes"));
  const [postDislikes, setPostDislikes] = useState(getFromLS("postDislikes"));

  useEffect(() => {
    setToLS("postLikes", postLikes);
    setToLS("postUnlikes", postUnlikes);
    setToLS("postDislikes", postDislikes);
  }, [postLikes, postUnlikes, postDislikes]);

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

  const addPostDislike = (id) => {
    const newPostLikes = postLikes.filter((post) => post.id !== id);
    setPostLikes(newPostLikes);
    const newPostDislikes = [
      ...postDislikes,
      { id, disliked: false, synced: false },
    ];
    setPostDislikes(newPostDislikes);
  };

  const isPostLiked = (id) => {
    return postLikes.find((post) => post.id === id);
  };

  const isPostDisliked = (id) => {
    return postDislikes.find((post) => post.id === id);
  };

  return (
    <PostContext.Provider
      value={{
        postLikes,
        addPostLike,
        removePostLike,
        isPostLiked,
        addPostDislike,
        isPostDisliked,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
