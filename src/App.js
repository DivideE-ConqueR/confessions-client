import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import New from "./pages/new";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="new" element={<New />} />
    </Routes>
  );
}
