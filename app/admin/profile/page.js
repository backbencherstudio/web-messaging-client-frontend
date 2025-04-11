"use client";
import EditProfile from "@/app/user/editprofile/EditProfile";
import withAuth from "@/app/Components/AdminComponents/withAuth";

const AdminProfilePage = () => {
  return (
    <div className="px-8 py-4">
      <EditProfile />
    </div>
  );
};

export default withAuth(AdminProfilePage);
