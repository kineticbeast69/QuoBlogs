import CommentsBlogTable from "../../components/admin/commentsBlogTable";
export default function CommentBlogPage() {
  return (
    <div className="pt-5 px-5 sm:pl-16 bg-blue-50/50 w-full">
      <div className="flex flex-col justify-between  max-w-3xl">
        <div className="flex items-center justify-between">
          <h1>Commented Blogs</h1>
        </div>

        {/* table for public blogs and it comments*/}
        <CommentsBlogTable />
      </div>
    </div>
  );
}
