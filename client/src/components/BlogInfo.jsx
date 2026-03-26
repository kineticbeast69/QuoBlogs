import {
  Facebook,
  Instagram,
  ThumbsDown,
  ThumbsUp,
  Twitter,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { Suspense, useState, useEffect } from "react";
import LoadingComment from "./loading/loadingComment";
import Comment from "./Comments";
import axios from "axios";
import AIicon from "../assets/images/ai.png";
export default function BlogInfo() {
  const { blogId } = useParams();
  const [info, setInfo] = useState("");
  const [author, setAuthor] = useState("");
  const [req, setReq] = useState(false);
  const blogInfo = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_BASE_URL + `quoblogs/blog-info/${blogId}`,
      );
      // console.log(response.data);
      setInfo(response.data.blog);
      setAuthor(response.data.author);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      }
    }
  };
  const likesBlog = async (id) => {
    try {
      setReq(true);
      const request = await axios.put(
        import.meta.env.VITE_BASE_URL + `quoblogs/likes/${id}`,
      );
      // console.log(request);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      }
    } finally {
      setReq(false);
    }
  };
  const disLikesBlog = async (id) => {
    try {
      setReq(true);
      const request = await axios.put(
        import.meta.env.VITE_BASE_URL + `quoblogs/dislikes/${id}`,
      );
      // console.log(request);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      }
    } finally {
      setReq(false);
    }
  };
  // console.log(info);
  useEffect(() => {
    blogInfo();
  }, [blogId, req]);
  return (
    <div>
      <div className="text-center mt-10 text-gray-600 text-wrap">
        <p className="text-blue-600 py-4 font-medium">
          Published at : {new Date(info?.createdAt).toLocaleDateString("en-GB")}
        </p>
        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">
          {info?.title}
        </h1>
        <h2 className="my-5 max-w-lg truncate mx-auto">{info?.subtitle}</h2>
        <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-blue-500/45 bg-blue-500/5 font-medium text-blue-600">
          {author?.name}
        </p>
      </div>
      {/* blog images and description */}
      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
        <img
          src={info?.imageUrl}
          alt="blog_image"
          className="rounded-3xl mb-5 mx-auto p-4 w-[70%] bg-slate-300/30"
        />

        {/* blog description */}
        <div
          dangerouslySetInnerHTML={{ __html: info?.description || "" }}
          className=" text-[15px] mx-auto max-w-3xl"
        ></div>

        {/* blog like & dislike */}
        <div className=" flex items-start max-w-3xl mx-auto gap-6 mt-5 ">
          <div
            className="flex items-center-safe justify-center gap-2"
            onClick={() => likesBlog(blogId)}
          >
            <ThumbsUp
              size={22}
              className="text-blue-500  active:text-blue-700 mb-1.5 hover:scale-125  duration-300 transition-all"
            />
            {info?.likes}
          </div>
          <div
            className="flex items-center justify-center gap-2"
            onClick={() => disLikesBlog(blogId)}
          >
            <ThumbsDown
              size={22}
              className="text-red-500 active:text-red-700 mt-1 hover:scale-125  duration-300 transition-all"
            />
            {info?.disLikes}
          </div>
        </div>

        {/* comments section */}
        <div className="mt-14 mb-10 max-w-3xl mx-auto overflow-y-scroll">
          <Suspense fallback={<LoadingComment />}>
            <Comment blogID={blogId} />
          </Suspense>
        </div>
        {/* share these article */}
        <div className="my-24 max-w-3xl mx-auto flex items-center justify-between ">
          <p className="font-semibold my-4">
            Share this article on social media.
          </p>
          <div className="flex gap-3">
            <Facebook />
            <Twitter />
            <Instagram />
          </div>
        </div>
      </div>
    </div>
  );
}
