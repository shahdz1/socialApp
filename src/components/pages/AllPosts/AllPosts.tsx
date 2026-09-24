import { useContext, useEffect, useState } from "react";
import { authContext } from "../../../context/authContext";
import axios from "axios";
import { baseUrl } from "../../../const/evn";
import PostCard from "../../shared/postCard/postCard";
import Loading from "../../shared/Loading/Loading";
import type { Posts } from "../../../interface/AllPosts.interface";

export default function AllPosts() {
  const [posts, setPosts] = useState<Posts[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  let auth = useContext(authContext);
  if (!auth) {
    throw new Error("there is an error");
  }
  let { token } = auth;

  function getAllPosts() {
    setLoading(true);
    axios
      .get(`${baseUrl}/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPosts(response.data.data.posts);
        setLoading(false);
        setError(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(true);
      });
  }
  useEffect(() => {
    getAllPosts();
  }, [token]);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return (
      <p className="text-red-600 text-center font-bold text-xl py-10">there is an error in posts</p>
    );
  }

  return (
    <>
      {posts.map((post) => (
        <PostCard key={post._id} {...post} />
      ))}
    </>
  );
}
