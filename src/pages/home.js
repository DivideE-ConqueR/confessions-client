import { useEffect, useState } from "react";
import axios from "../api/base";
import Header from "../components/Header";
import Card from "../components/Card";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("/posts").then((res) => res.data);
      setPosts(response);
    }
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <div className="p-4 bg-slate-400/20 flex flex-col space-y-4">
        {posts.map((post) => (
          <Card
            key={post._id}
            postBody={post.postBody}
            createdAt={post.createdAt}
            name={post.name}
            id={post.postId}
            likes={post.likes}
            dislikes={post.dislikes}
            comments={post.commentsNumber}
          />
        ))}
      </div>
    </div>
  );
}
