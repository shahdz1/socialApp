import axios from "axios";
import { baseUrl } from "../../../const/evn";
import { useContext } from "react";
import { authContext } from "../../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import PostCard from "../../shared/postCard/postCard";
import PostDetails from "../PostDetails/PostDetails";

export default function PostCommentDetails(postDetials: any) {

  let auth = useContext(authContext);
  if (!auth) {
    throw new Error("there is an error");
  }
  let { token } = auth;

  function getAllComments() {
    return axios.get(
      `${baseUrl}/posts/${postDetials._id}/comments?page=1&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
  let { data } = useQuery({
    queryFn: getAllComments,
    queryKey: ["postComments"],
    select:(data)=> data.data.data,
  });

  return (
    <div>
      <PostCard
        {...postDetials}
        Comments={data?.comments ?? data}
        {...PostDetails}
        singelDetails={true}
      />
    </div>
  );
}
