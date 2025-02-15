import AdminHeader from "../Components/AdminComponents/AdminHeader";
import AdminNavBar from "../Components/AdminComponents/AdminNavBar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <AdminNavBar />
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <AdminHeader />
        <div className="flex-1 overflow-auto">
          <div className="p-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
