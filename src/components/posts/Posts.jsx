import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Posts = ({ userId }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["post", userId],  // Correctly structured queryKey
    queryFn: () =>
      makeRequest.get(`/post?userId=${userId}`).then((res) => res.data),
    enabled: !!userId,  // Ensures the query only runs if userId is available
  });

  return (
    <div className="posts">
      {error
        ? "Something went wrong!"
        : isLoading
        ? "Loading..."
        : data?.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};

export default Posts;
