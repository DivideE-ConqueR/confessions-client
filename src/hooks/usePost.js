import { useContext } from "react";
import { PostContext } from "../context/postContext";

export function usePost() {
  return useContext(PostContext);
}
