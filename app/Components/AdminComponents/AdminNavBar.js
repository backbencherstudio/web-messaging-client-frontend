"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaCog, FaHome } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { TbMessage2 } from "react-icons/tb";
import { AiOutlineUserAdd } from "react-icons/ai";
import { PiNoteLight } from "react-icons/pi";
const AdminNavBar = () => {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", path: "/admin", icon: <RxDashboard /> },
    {
      label: "Messages Management",
      path: "/admin/messages",
      icon: <TbMessage2 size={18} />,
    },
    {
      label: "User Management",
      path: "/admin/users",
      icon: <FiUsers size={18} />,
    },
    {
      label: "Contact Us Info",
      path: "/admin/contact-us",
      icon: <AiOutlineUserAdd size={18} />,
    },
    {
      label: "Content Customize",
      path: "/admin/content-customize",
      icon: <PiNoteLight size={18} />,
    },
  ];

  return (
    <div className="max-w-[250px] h-screen bg-white dark:bg-gray-800 border-r dark:border-gray-700 p-4 py-6">
      <div className="">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          SayThat.sh
        </h1>
      </div>

      <nav className="mt-8 text-sm font-medium">
        {navItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <div
              className={`px-4 py-2 my-2  rounded-lg hover:bg-gray-100 text-gray-800 hover:text-gray-800 dark:hover:bg-gray-700 ${
                pathname === item.path
                  ? "bg-[#393c44] text-white dark:bg-gray-700"
                  : ""
              }`}
            >
              <span className=" dark:text-gray-200 flex items-center gap-2.5">
                {item.icon} {item.label}
              </span>
            </div>
          </Link>
        ))}
      </nav>
      <p className="text-gray-500 text-sm mt-8 absolute bottom-6 left-6">
        Logout
      </p>
    </div>
  );
};

export default AdminNavBar;
