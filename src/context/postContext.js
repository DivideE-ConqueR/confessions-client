import { createContext, useEffect, useState } from "react";
import { getFromLS, setToLS } from "../utils/localStorage";

export const PostContext = createContext(null);

export default function PostProvider({ children }) {
  const [postLikes, setPostLikes] = useState(getFromLS("postLikes"));
  const [postUnlikes, setPostUnlikes] = useState(getFromLS("postUnlikes"));
  const [postDislikes, setPostDislikes] = useState(getFromLS("postDislikes"));
  const [postUndislikes, setPostUndislikes] = useState(
    getFromLS("postUndislikes")
  );

  useEffect(() => {
    setToLS("postLikes", postLikes);
    setToLS("postUnlikes", postUnlikes);
    setToLS("postDislikes", postDislikes);
    setToLS("postUndislikes", postUndislikes);
  }, [postLikes, postUnlikes, postDislikes, postUndislikes]);

  const addPostLike = (id) => {
    const newPostDislikes = postDislikes.filter((post) => post.id !== id);
    setPostDislikes(newPostDislikes);
    const newPostUnlikes = postUnlikes.filter((post) => post.id !== id);
    setPostUnlikes(newPostUnlikes);
    const newPostLikes = [...postLikes, { id, liked: true, synced: false }];
    setPostLikes(newPostLikes);
  };

  const removePostLike = (id) => {
    if (isPostLiked(id)?.synced === true) {
      const newPostUnlikes = [
        ...postUnlikes,
        { id, liked: false, synced: false },
      ];
      setPostUnlikes(newPostUnlikes);
    }
    const newPostLikes = postLikes.filter((post) => post.id !== id);
    setPostLikes(newPostLikes);
  };

  const addPostDislike = (id) => {
    const newPostLikes = postLikes.filter((post) => post.id !== id);
    setPostLikes(newPostLikes);
    const newPostUndislikes = postUndislikes.filter((post) => post.id !== id);
    setPostUndislikes(newPostUndislikes);
    const newPostDislikes = [
      ...postDislikes,
      { id, disliked: true, synced: false },
    ];
    setPostDislikes(newPostDislikes);
  };

  const removePostDislike = (id) => {
    if (isPostDisliked(id)?.synced === true) {
      const newPostUndislikes = [
        ...postUndislikes,
        { id, disliked: false, synced: false },
      ];
      setPostUndislikes(newPostUndislikes);
    }
    const newPostDislikes = postDislikes.filter((post) => post.id !== id);
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
        addPostLike,
        removePostLike,
        isPostLiked,
        addPostDislike,
        removePostDislike,
        isPostDisliked,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
