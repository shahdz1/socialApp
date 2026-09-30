import { useContext } from "react";
import { authContext, type AuthContextType } from "../../../context/authContext";
import axios from "axios";
import { baseUrl } from "../../../const/evn";
import PostCard from "../../shared/postCard/postCard";
import Loading from "../../shared/Loading/Loading";
import type { Posts } from "../../../interface/AllPosts.interface";
import { useQuery } from "@tanstack/react-query";

export default function AllPosts() {
  let auth = useContext(authContext) as AuthContextType;
  let { token } = auth;

  function getAllPosts() {
    return axios.get(`${baseUrl}/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  let { data, isLoading, isError } = useQuery({
    queryFn: getAllPosts,
    queryKey: ["allPosts"],
    select: (data) => data?.data.data.posts,
  });
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return (
      <p className="text-red-600 text-center font-bold text-xl py-10">
        there is an error in posts
      </p>
    );
  }

  return (
    <>
      {data.map((post: Posts) => (
        <PostCard key={post._id} {...post} singelDetails={false}/>
      ))}
    </>
  );
}
