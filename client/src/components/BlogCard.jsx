import image from "../assets/images/image.webp";
import { Link } from "react-router-dom";
export default function BlogCard({ list }) {
  // const description = list?.description.slice(0, 80);
  return (
    <Link to={`blog/${list._id}`}>
      <div className="w-fit rounded-lg overflow-hidden shadow hover:scale-102 hover:shadow-blue-600/60 duration-300 cursor-pointer">
        <img src={list?.imageUrl} alt="" className="aspect-video" />
        <span className="ml-5 mt-4 px-3 py-1 inline-block capitalize bg-blue-500/20 rounded-full text-blue-500 text-xs">
          {list?.category}
        </span>
        <div className="p-5">
          <h5 className="mb-2 font-medium text-gray-900">{list?.title}</h5>
          <div
            className="mb-3 text-xs text-gray-600 line-clamp-2"
            dangerouslySetInnerHTML={{
              __html: list?.description || "",
            }}
          />
        </div>
      </div>
    </Link>
  );
}
