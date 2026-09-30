import { Helmet } from "react-helmet";
import AllPosts from "../../components/pages/AllPosts/AllPosts";
import CreatePost from "../../components/shared/CreatePost/CreatePost";
export default function Home() {
  return (
    <>
    <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="bg-gray-100">
        <CreatePost />
        <AllPosts />
      </div>
    </>
  );
}
