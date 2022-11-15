import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "../api/services/post";
import { useAlert } from "../hooks/useAlert";
import Header from "../components/Header";
import Input from "../components/Input";
import Footer from "../components/Footer";

export default function New() {
  const navigate = useNavigate();
  const { openAlert } = useAlert();

  const [postBody, setPostBody] = useState("");

  const mutation = useMutation({
    mutationFn: () => {
      createPost({
        body: postBody,
        tags: [...new Set(postBody.match(/(#+[a-zA-Z0-9(_)]{1,})/gi))],
      });
    },
    onSuccess: () => {
      openAlert({
        message: "Post created successfully!",
        severity: "success",
      });
      navigate("/");
    },
    onError: (error) => {
      openAlert({
        message: "Something went wrong!",
        severity: "error",
      });
      console.error(error.response.data);
    },
  });

  return (
    <>
      <Header />

      <div className="p-4 space-y-6">
        <h1 className="font-medium text-center">
          Share your secret with the world
        </h1>
        <Input
          value={postBody}
          onChange={setPostBody}
          onClick={() => mutation.mutate()}
          label="Post"
          placeholder="Your message..."
          rows="10"
        />
      </div>

      <Footer />
    </>
  );
}
