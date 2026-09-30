import { useContext, useState } from "react";
import {
  authContext,
  type AuthContextType,
} from "../../../context/authContext";
import {
  userContext,
  type UserContextType,
} from "../../../context/userContext";
import axios from "axios";
import { baseUrl } from "../../../const/evn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FcLike } from "react-icons/fc";
import { FaRegHeart } from "react-icons/fa";

export default function LikeComponent({likesCount,postId, likesArr}:{likesCount: number; postId: string; likesArr:string[]}) {
  const { token } = useContext(authContext) as AuthContextType;
  const { userData } = useContext(userContext) as UserContextType;
  let [like, setLikes] = useState<boolean>(likesArr.includes(userData?._id ?? ""));

  function likeUnLike() {
    return axios.put(
      `${baseUrl}/posts/${postId}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
  const QueryClient = useQueryClient();
  let { mutate } = useMutation({
    mutationFn: likeUnLike,
    onSuccess: (res) => {
      setLikes(res.data.data.liked);
      (QueryClient.invalidateQueries({ queryKey: ["allPosts"] }),
        QueryClient.invalidateQueries({ queryKey: ["profileData"] }),
        QueryClient.invalidateQueries({ queryKey: ["postDetails", postId] }));
    },
  });

  return (
    <>
      <div className="flex items-center space-x-2">
        <button onClick={()=>{mutate()}} className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
{like?
<FcLike />
:
<FaRegHeart />


}
          <span>{likesCount} Likes</span>
        </button>
      </div>
    </>
  );
}
