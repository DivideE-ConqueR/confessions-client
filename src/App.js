import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import New from "./pages/new";
import Post from "./pages/post";
import Custom404 from "./pages/404";
import Search from "./pages/search";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="new" element={<New />} />
      <Route path="posts/:id" element={<Post />} />
      <Route path="search" element={<Search />} />
      <Route path="*" element={<Custom404 />} />
    </Routes>
  );
}
