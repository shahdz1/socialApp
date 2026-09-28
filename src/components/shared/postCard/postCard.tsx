import { Link } from "react-router-dom";
import type { Posts } from "../../../interface/AllPosts.interface";
import PostCardComment from "../postCardComment/postCardComment";
import PostCardHeader from "../postCardHeader/postCardHeader";

export default function PostCard(details: Posts) {
  return (
    <>
      <div className="bg-gray-100 max-h-screen py-5 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
          <PostCardHeader {...details} />
          {!details.singelDetails ? (
            <Link to={`/postDetails/` + details._id}>
              <p className="text-sky-600 pt-3 font-semibold">Show Details</p>
            </Link>
          ) : null}

          <hr className="mt-2 mb-2" />
          <p className="text-gray-800 font-semibold">Comment</p>
          <hr className="mt-2 mb-2" />

          {details?.Comments?.length > 0 ? (
            <>
              {details?.Comments.map((Comment: any) => {
                return <PostCardComment {...Comment} />;
              })}
            </>
          ) : (
            <>
              {details.topComment ? (
                <PostCardComment {...details.topComment} />
              ) : (
                <p className="text-slate-500">there is no comments</p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
