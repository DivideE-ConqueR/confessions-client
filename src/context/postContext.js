import { createContext, useCallback, useEffect, useState } from "react";
import { getFromLS, setToLS } from "../utils/localStorage";
import axios from "../api/base";

export const PostContext = createContext(null);

export default function PostProvider({ children }) {
  const _starterPostLikes = getFromLS("post_likes");
  const _starterPostUnlikes = getFromLS("post_unlikes");
  const _starterPostDislikes = getFromLS("post_dislikes");
  const _starterPostUndislikes = getFromLS("post_undislikes");
  const _starterPostReports = getFromLS("post_reports");

  const [postLikes, setPostLikes] = useState(_starterPostLikes);
  const [postUnlikes, setPostUnlikes] = useState(_starterPostUnlikes);
  const [postDislikes, setPostDislikes] = useState(_starterPostDislikes);
  const [postUndislikes, setPostUndislikes] = useState(_starterPostUndislikes);
  const [postReports, setPostReports] = useState(_starterPostReports);

  useEffect(() => {
    setToLS("post_likes", postLikes);
  }, [postLikes]);

  useEffect(() => {
    setToLS("post_unlikes", postUnlikes);
  }, [postUnlikes]);

  useEffect(() => {
    setToLS("post_dislikes", postDislikes);
  }, [postDislikes]);

  useEffect(() => {
    setToLS("post_undislikes", postUndislikes);
  }, [postUndislikes]);

  useEffect(() => {
    setToLS("post_reports", postReports);
  }, [postReports]);

  const addPostLike = (id) => {
    if (isPostDisliked(id)?.synced === true) {
      setPostUndislikes((prev) => [
        ...prev,
        { id, disliked: false, synced: false },
      ]);
    }

    const newPostDislikes = postDislikes.filter((post) => post.id !== id);
    const newPostUnlikes = postUnlikes.filter((post) => post.id !== id);
    setPostDislikes(newPostDislikes);
    setPostUnlikes(newPostUnlikes);
    setPostLikes((prev) => [...prev, { id, liked: true, synced: false }]);
  };

  const removePostLike = (id) => {
    if (isPostLiked(id)?.synced === true) {
      setPostUnlikes((prev) => [...prev, { id, liked: false, synced: false }]);
    }

    const newPostLikes = postLikes.filter((post) => post.id !== id);
    setPostLikes(newPostLikes);
  };

  const addPostDislike = (id) => {
    if (isPostLiked(id)?.synced === true) {
      setPostUnlikes((prev) => [...prev, { id, liked: false, synced: false }]);
    }

    const newPostLikes = postLikes.filter((post) => post.id !== id);
    const newPostUndislikes = postUndislikes.filter((post) => post.id !== id);
    setPostLikes(newPostLikes);
    setPostUndislikes(newPostUndislikes);
    setPostDislikes((prev) => [...prev, { id, disliked: true, synced: false }]);
  };

  const removePostDislike = (id) => {
    if (isPostDisliked(id)?.synced === true) {
      setPostUndislikes((prev) => [
        ...prev,
        { id, disliked: false, synced: false },
      ]);
    }

    const newPostDislikes = postDislikes.filter((post) => post.id !== id);
    setPostDislikes(newPostDislikes);
  };

  const addPostReport = (id) => {
    setPostReports((prev) => [...prev, { id, reported: true, synced: false }]);
  };

  const isPostLiked = (id) => {
    return postLikes.find((post) => post.id === id);
  };

  const isPostDisliked = (id) => {
    return postDislikes.find((post) => post.id === id);
  };

  const isPostReported = (id) => {
    return postReports.find((post) => post.id === id);
  };

  const syncLikes = useCallback(async () => {
    // ⬇ this is a problem, structuredClone is not supported by all browsers yet...
    // const copyPostLikes = structuredClone(postLikes);

    const copyPostLikes = postLikes.map((x) => ({ ...x }));
    const ids = [];

    copyPostLikes.forEach((post) => {
      if (post.synced === false) {
        post.synced = true;
        ids.push(post.id);
      }
    });

    if (!(ids.length > 0)) return;

    try {
      await axios.post("/likes", { ids });
      setPostLikes(copyPostLikes);
    } catch (error) {
      console.log(
        `${error.code}: ${error.response.status} - ${error.response.data}`
      );
    }
  }, [postLikes]);

  const syncUnlikes = useCallback(async () => {
    // ⬇ this is a problem, structuredClone is not supported by all browsers yet...
    // const copyPostUnlikes = structuredClone(postUnlikes);

    const copyPostUnlikes = postUnlikes.map((x) => ({ ...x }));
    const ids = [];

    copyPostUnlikes.forEach((post) => {
      if (post.synced === false) {
        post.synced = true;
        ids.push(post.id);
      }
    });

    if (!(ids.length > 0)) return;

    try {
      await axios.post("/unlikes", { ids });
      setPostUnlikes(copyPostUnlikes);
    } catch (error) {
      console.log(
        `${error.code}: ${error.response.status} - ${error.response.data}`
      );
    }
  }, [postUnlikes]);

  const syncDislikes = useCallback(async () => {
    // ⬇ this is a problem, structuredClone is not supported by all browsers yet...
    // const copyPostUnlikes = structuredClone(postUnlikes);

    const copyPostDislikes = postDislikes.map((x) => ({ ...x }));
    const ids = [];

    copyPostDislikes.forEach((post) => {
      if (post.synced === false) {
        post.synced = true;
        ids.push(post.id);
      }
    });

    if (!(ids.length > 0)) return;

    try {
      await axios.post("/dislikes", { ids });
      setPostDislikes(copyPostDislikes);
    } catch (error) {
      console.log(
        `${error.code}: ${error.response.status} - ${error.response.data}`
      );
    }
  }, [postDislikes]);

  const syncUndislikes = useCallback(async () => {
    // ⬇ this is a problem, structuredClone is not supported by all browsers yet...
    // const copyPostUnlikes = structuredClone(postUnlikes);

    const copyPostUndislikes = postUndislikes.map((x) => ({ ...x }));
    const ids = [];

    copyPostUndislikes.forEach((post) => {
      if (post.synced === false) {
        post.synced = true;
        ids.push(post.id);
      }
    });

    if (!(ids.length > 0)) return;

    try {
      await axios.post("/undislikes", { ids });
      setPostUndislikes(copyPostUndislikes);
    } catch (error) {
      console.log(
        `${error.code}: ${error.response.status} - ${error.response.data}`
      );
    }
  }, [postUndislikes]);

  const syncReports = useCallback(async () => {
    // ⬇ this is a problem, structuredClone is not supported by all browsers yet...
    // const copyPostReports = structuredClone(postReports);

    const copyPostReports = postReports.map((x) => ({ ...x }));
    const ids = [];

    copyPostReports.forEach((post) => {
      if (post.synced === false) {
        post.synced = true;
        ids.push(post.id);
      }
    });

    if (!(ids.length > 0)) return;

    try {
      await axios.post("/reports", { ids });
      setPostReports(copyPostReports);
    } catch (error) {
      console.log(
        `${error.code}: ${error.response.status} - ${error.response.data}`
      );
    }
  }, [postReports]);

  useEffect(() => {
    const syncTimer = setInterval(async () => {
      await Promise.all([
        syncLikes(),
        syncUnlikes(),
        syncDislikes(),
        syncUndislikes(),
        syncReports(),
      ]);
    }, 1 * 10 * 1000);

    return () => clearInterval(syncTimer);
    // eslint-disable-next-line no-use-before-define
  }, [syncDislikes, syncLikes, syncReports, syncUndislikes, syncUnlikes]);

  return (
    <PostContext.Provider
      value={{
        addPostLike,
        removePostLike,
        isPostLiked,
        addPostDislike,
        removePostDislike,
        isPostDisliked,
        addPostReport,
        isPostReported,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
