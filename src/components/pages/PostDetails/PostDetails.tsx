import { useContext } from "react";
import { useParams } from "react-router-dom";
import { authContext } from "../../../context/authContext";
import axios from "axios";
import { baseUrl } from "../../../const/evn";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../shared/Loading/Loading";
import PostCard from "../../shared/postCard/postCard";

export default function PostDetails() {
  let { postId } = useParams();
  let auth = useContext(authContext);
  if (!auth) {
    throw new Error("there is an error");
  }
  let { token } = auth;
  function getPostDetails() {
    return axios.get(`${baseUrl}/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  let { data, isLoading, isError } = useQuery({
    queryFn: getPostDetails,
    queryKey: ["postDetails", postId],
    select: (data) => data?.data.data.post,
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
        <PostCard {...data} singelDetails={true}/>
    </>
  );
}
