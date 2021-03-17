import * as React from "react";

const PostContext = React.createContext<any>(null);

const PostProvider: React.FC<{}> = ({ children }) => {
  const state = {};

  const api = {};

  return (
    <PostContext.Provider value={[state, api]}>{children}</PostContext.Provider>
  );
};

export default PostProvider;

export const usePost = () => React.useContext(PostContext);
