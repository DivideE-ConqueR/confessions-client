import { useQuery } from "@tanstack/react-query";
import { useErrorHandler } from "react-error-boundary";
import { getAllPosts } from "../api/services/post";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Card from "../components/Card";
import Footer from "../components/Footer";

export default function Home() {
  const handleError = useErrorHandler();

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
    onError: handleError,
  });

  return (
    <>
      <Header />

      {isLoading ? (
        <Loader />
      ) : (
        !isError && (
          <main className="flex flex-col space-y-4 bg-slate-400/20 p-4">
            {posts.data.map((post) => (
              <Card key={post._id} post={post} />
            ))}
          </main>
        )
      )}

      <Footer />
    </>
  );
}
