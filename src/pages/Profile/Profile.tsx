import { useContext } from "react";
import { userContext, type UserContextType } from "../../context/userContext";
import imgCover from "../../assets/images.jpg";
import { authContext, type AuthContextType } from "../../context/authContext";
import axios from "axios";
import { baseUrl } from "../../const/evn";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/shared/Loading/Loading";
import PostCard from "../../components/shared/postCard/postCard";
import type { Posts } from "../../interface/AllPosts.interface";
import CreatePost from "../../components/shared/CreatePost/CreatePost";
import { Helmet } from "react-helmet";
export default function Profile() {
  let { userData } = useContext(userContext) as UserContextType;
  let auth = useContext(authContext) as AuthContextType;

  let { token } = auth;

  function getUserPosts() {
    return axios.get(`${baseUrl}/users/${userData?.id}/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  let { data, isError, isLoading } = useQuery({
    queryFn: getUserPosts,
    queryKey: ["profileData"],
    select: (data) => data?.data.data.posts,
  });

  if (isError) {
    return (
      <p className="text-red-800 text-center font-bold">there is an error</p>
    );
  }
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className="bg-gray-100">
        <div className="h-full p-8">
          <div className=" rounded-lg  pb-8">
            <div className="w-full h-70">
              {userData?.cover == "" ? (
                <img
                  src={imgCover}
                  className="w-full h-full rounded-tl-lg rounded-tr-lg"
                />
              ) : (
                <img
                  src={userData?.cover}
                  className="w-full h-full rounded-tl-lg rounded-tr-lg"
                />
              )}
            </div>
            <div className="flex flex-col items-center -mt-20">
              <img
                src={userData?.photo}
                className="w-40 border-4 border-white rounded-full"
              />
              <div className="flex items-center space-x-2 mt-2">
                <p className="text-2xl">{userData?.name}</p>
              </div>
              <p className="text-gray-700">{userData?.email}</p>
            </div>
          </div>
        </div>
        <CreatePost />
        {data?.map((post: Posts) => {
          return <PostCard {...post} singelDetails={false} />;
        })}
      </div>
    </>
  );
}
