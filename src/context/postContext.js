import { createContext, useEffect, useState } from "react";
import { getFromLS, setToLS } from "../utils/localStorage";
import axios from "../api/base";

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

  useEffect(() => {
    const timer = setInterval(async () => {
      await Promise.all([
        syncLikes(),
        syncUnlikes(),
        syncDislikes(),
        syncUndislikes(),
      ]);
    }, 10 * 1000);

    return () => clearInterval(timer);
  });

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

  const syncLikes = async () => {
    // this is the problem, structuredClone is not supported by all browsers yet...
    // const copyPostLikes = structuredClone(postLikes);

    const copyPostLikes = postLikes.map((x) => ({ ...x }));
    const ids = [];

    copyPostLikes.forEach((post) => {
      if (post.synced === false) {
        post.synced = true;
        ids.push(post.id);
      }
    });

    console.log("syncing likes", ids);

    if (!(ids.length > 0)) return;

    await axios.post("/likes", { ids }).then((res) => {
      console.log(res);
      setPostLikes(copyPostLikes);
    });
  };

  const syncUnlikes = async () => {
    // this is the problem, structuredClone is not supported by all browsers yet...
    // const copyPostUnlikes = structuredClone(postUnlikes);

    const copyPostUnlikes = postUnlikes.map((x) => ({ ...x }));
    const ids = [];

    copyPostUnlikes.forEach((post) => {
      if (post.synced === false) {
        post.synced = true;
        ids.push(post.id);
      }
    });

    console.log("syncing unlikes", ids);

    if (!(ids.length > 0)) return;

    await axios.post("/unlikes", { ids }).then((res) => {
      console.log(res);
      setPostUnlikes(copyPostUnlikes);
    });
  };

  const syncDislikes = async () => {
    // this is the problem, structuredClone is not supported by all browsers yet...
    // const copyPostUnlikes = structuredClone(postUnlikes);

    const copyPostDislikes = postDislikes.map((x) => ({ ...x }));
    const ids = [];

    copyPostDislikes.forEach((post) => {
      if (post.synced === false) {
        post.synced = true;
        ids.push(post.id);
      }
    });

    console.log("syncing dislikes", ids);

    if (!(ids.length > 0)) return;

    await axios.post("/dislikes", { ids }).then((res) => {
      console.log(res);
      setPostDislikes(copyPostDislikes);
    });
  };

  const syncUndislikes = async () => {
    // this is the problem, structuredClone is not supported by all browsers yet...
    // const copyPostUnlikes = structuredClone(postUnlikes);

    const copyPostUndislikes = postUndislikes.map((x) => ({ ...x }));
    const ids = [];

    copyPostUndislikes.forEach((post) => {
      if (post.synced === false) {
        post.synced = true;
        ids.push(post.id);
      }
    });

    console.log("syncing undislikes", ids);

    if (!(ids.length > 0)) return;

    await axios.post("/undislikes", { ids }).then((res) => {
      console.log(res);
      setPostUndislikes(copyPostUndislikes);
    });
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
