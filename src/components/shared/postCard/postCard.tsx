import type { Posts } from "../../../interface/AllPosts.interface";
import PostCardComment from "../postCardComment/postCardComment";
import PostCardHeader from "../postCardHeader/postCardHeader";

export default function PostCard(details:Posts) {
  return (
    <>
      <div className="bg-gray-100 max-h-screen py-5 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
          <PostCardHeader {...details} />
          {details.topComment ? (
            <PostCardComment {...details.topComment} />
          ) : (
            <p className="text-slate-500">there is no comments</p>
          )}
        </div>
      </div>
    </>
  );
}
