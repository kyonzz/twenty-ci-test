// @ts-nocheck

import * as React from "react";
import { PostType } from "../@types";
import { useAuth } from "./auth";

let id = 3;

interface PostState {
  posts: PostType[];
}

interface PostApi {
  addPost: (title: string, content: string) => void;
}

const PostContext = React.createContext<[PostState, PostApi]>([
  {
    posts: [],
  },
  {},
]);

const PostProvider: React.FC<{}> = ({ children }) => {
  const [posts, setPosts] = React.useState<PostType[]>([
    {
      id: 1,
      title: "First post",
      content: "Very first post",
      author: "demo",
      created_at: 1615999772978,
    },
    {
      id: 2,
      title: "Second post",
      content:
        "Second post is longer than first postSecond post is longer than first postSecond post is longer than first postSecond post is longer than first postSecond post is longer than first postSecond post is longer than first postSecond post is longer than first postSecond post is longer than first postSecond post is longer than first postSecond post is longer than first postSecond post is longer than first post",
      author: "demo",
      created_at: 1615999814807,
    },
  ]);

  const { user } = useAuth();

  const state = { posts };

  const addPost = (title, content) => {
    setPosts([
      ...posts,
      {
        id: id++,
        title,
        content,
        author: user,
        created_at: Date.now(),
      },
    ]);
  };

  const api = { addPost };

  return (
    <PostContext.Provider value={[state, api]}>{children}</PostContext.Provider>
  );
};

export default PostProvider;

export const usePost = () => React.useContext(PostContext);
