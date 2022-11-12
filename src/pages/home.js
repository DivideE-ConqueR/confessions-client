import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../api/services/post";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Card from "../components/Card";
import Footer from "../components/Footer";

export default function Home() {
  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery({ queryKey: ["posts"], queryFn: getAllPosts });

  return (
    <>
      <Header />

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div>{error.message}</div>
      ) : (
        <main className="p-4 bg-slate-400/20 flex flex-col space-y-4">
          {posts.data.map((post) => (
            <Card key={post._id} post={post} />
          ))}
        </main>
      )}

      <Footer />
    </>
  );
}
