import {
  FilePlus,
  LayoutDashboard,
  ListChecks,
  MessageSquareMore,
  Podcast,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";
export default function Sidebar() {
  const role = localStorage.getItem("role");
  let values = [];
  switch (role) {
    case "admin":
      values = [
        { to: "/admin", icon: <LayoutDashboard />, name: "Dashboard" },
        { to: "/admin/list-blog", icon: <ListChecks />, name: "Blog List" },
        { to: "/admin/author-list", icon: <Users />, name: "Author List" },
        {
          to: "/admin/subscribe-list",
          icon: <Podcast />,
          name: "Subscriber List",
        },
        {
          to: "/admin/comments",
          icon: <MessageSquareMore />,
          name: "Comments",
        },
      ];
      break;
    case "author":
      values = [
        { to: "/author", icon: <LayoutDashboard />, name: "Dashboard" },
        { to: "/author/add-blog", icon: <FilePlus />, name: "Add Blog" },
        { to: "/author/blog-list", icon: <ListChecks />, name: "Blog List" },
        {
          to: "/author/comments",
          icon: <MessageSquareMore />,
          name: "Comment List",
        },
      ];
      break;
  }
  return (
    <aside>
      {values.map((value, index) => (
        <NavLink
          key={index}
          end={true}
          to={value.to}
          className={({ isActive }) =>
            `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
              isActive &&
              "bg-blue-500/10 border-r-4 text-blue-600 border-blue-600"
            }`
          }
        >
          {value.icon}
          <p className="hidden md:inline-block">{value.name}</p>
        </NavLink>
      ))}
    </aside>
  );
}
