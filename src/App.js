import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PostProvider from "./context/postContext";
import AlertProvider from "./context/alertContext";
import Home from "./pages/home";
import New from "./pages/new";
import Post from "./pages/post";
import Custom404 from "./pages/404";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AlertProvider>
        <PostProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="new" element={<New />} />
            <Route path="posts/:id" element={<Post />} />
            <Route path="*" element={<Custom404 />} />
          </Routes>
        </PostProvider>
      </AlertProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
