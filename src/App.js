import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import New from "./pages/new";
import Post from "./pages/post";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="new" element={<New />} />
      <Route path="posts/:id" element={<Post />} />
    </Routes>
  );
}
