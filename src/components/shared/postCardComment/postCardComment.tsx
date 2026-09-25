import type { Comment } from "../../../interface/AllPosts.interface";

export default function PostCardComment({
  content,
  commentCreator: { name, photo },
}: Comment) {
  return (
    <>
      <p className="text-gray-800 font-semibold">Comment</p>
      <hr className="mt-2 mb-2" />
      <div className="mt-4">
        <div className="flex items-center space-x-2">
          <img
            src={photo}
            alt="User Avatar"
            className="w-6 h-6 rounded-full"
          />
          <div>
            <p className="text-gray-800 font-semibold">{name}</p>
            <p className="text-gray-500 text-sm">{content}</p>
          </div>
        </div>
      </div>
    </>
  );
}
