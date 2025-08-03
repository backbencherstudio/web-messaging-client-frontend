"use client";
import { useState } from "react";
import {
  useGetDashboardOverviewQuery,
  useGetDashboardPostsQuery,
  useGetDashboardUsersQuery,
} from "@/app/store/api/leaderboardApi";
import dynamic from "next/dynamic";

const CustomTable = dynamic(
  () => import("@/app/Components/SharedComponent/CustomTable"),
  {
    ssr: false,
    loading: () => (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    ),
  }
);

export default function AdminDashboard() {
  // Messages table state
  const [messageSearchTerm, setMessageSearchTerm] = useState("");
  const [messageCurrentPage, setMessageCurrentPage] = useState(1);
  const [messageItemsPerPage, setMessageItemsPerPage] = useState(10);
  const [messageSortConfig, setMessageSortConfig] = useState({
    field: "created_at",
    order: "desc",
  });

  // New Users table state
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [userCurrentPage, setUserCurrentPage] = useState(1);
  const [userItemsPerPage, setUserItemsPerPage] = useState(10);
  const [userSortConfig, setUserSortConfig] = useState({
    field: "created_at",
    order: "desc",
  });

  // API calls
  const { data: overviewData } = useGetDashboardOverviewQuery();
  const {
    data: postsData,
    isLoading: isPostsLoading,
    isFetching: isPostsFetching,
  } = useGetDashboardPostsQuery({
    page: messageCurrentPage,
    limit: messageItemsPerPage,
    q: messageSearchTerm,
    sortBy: messageSortConfig.field,
    sortOrder: messageSortConfig.order,
  });

  // New Users API call
  const {
    data: usersData,
    isLoading: isUsersLoading,
    isFetching: isUsersFetching,
  } = useGetDashboardUsersQuery({
    page: userCurrentPage,
    limit: userItemsPerPage,
    q: userSearchTerm,
    sortBy: userSortConfig.field,
    sortOrder: userSortConfig.order,
  });

  // Column definitions
  const messageColumns = [
    {
      label: "Msg #",
      accessor: "post_number",
      sortField: "post_number",
    },
    {
      label: "Message content",
      accessor: "content",
    },
    {
      label: "Posted by",
      accessor: "posted_by",
    },
    {
      label: "Views",
      accessor: "views",
      sortField: "views",
    },
    {
      label: "Time Posted",
      accessor: "time_posted",
      sortField: "created_at",
    },
    {
      label: "Ranking",
      accessor: "ranking",
      sortField: "ranking",
    },
  ];

  // New Users columns
  const userColumns = [
    {
      label: "#",
      accessor: "position",
    },
    {
      label: "Name",
      accessor: "name",
      sortField: "name",
    },
    {
      label: "Email",
      accessor: "email",
      sortField: "email",
    },
    {
      label: "Total Messages",
      accessor: "total_messages",
      sortField: "total_messages",
    },
    {
      label: "Total Views",
      accessor: "total_views",
      sortField: "total_views",
    },
    {
      label: "Last Message",
      accessor: "last_message_date",
      sortField: "created_at",
    },
  ];

  // Message table handlers
  const handleMessageSearch = (value) => {
    setMessageSearchTerm(value);
    setMessageCurrentPage(1);
  };

  const handleMessageSort = (field, order) => {
    setMessageSortConfig({ field, order });
    setMessageCurrentPage(1);
  };

  const handleMessagePageChange = (page) => {
    setMessageCurrentPage(page);
  };

  const handleMessageItemsPerPageChange = (value) => {
    setMessageItemsPerPage(value);
    setMessageCurrentPage(1);
  };

  // New Users table handlers
  const handleUserSearch = (value) => {
    setUserSearchTerm(value);
    setUserCurrentPage(1);
  };

  const handleUserSort = (field, order) => {
    setUserSortConfig({ field, order });
    setUserCurrentPage(1);
  };

  const handleUserPageChange = (page) => {
    setUserCurrentPage(page);
  };

  const handleUserItemsPerPageChange = (value) => {
    setUserItemsPerPage(value);
    setUserCurrentPage(1);
  };

  return (
    <div className="space-y-8">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-custom-gradient p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Total Users
          </h3>
          <p className="text-3xl font-bold text-primary">
            {overviewData?.data?.total_users || 0}
          </p>
        </div>
        <div className="bg-white dark:bg-custom-gradient p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Total Posts
          </h3>
          <p className="text-3xl font-bold text-primary">
            {overviewData?.data?.total_posts || 0}
          </p>
        </div>
        <div className="bg-white dark:bg-custom-gradient p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Last Month Posts
          </h3>
          <p className="text-3xl font-bold text-primary">
            {overviewData?.data?.last_month_posts || 0}
          </p>
        </div>
        <div className="bg-white dark:bg-custom-gradient p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Total Revenue
          </h3>
          <p className="text-3xl font-bold text-primary">
            ${overviewData?.data?.total_revenue || "0.00"}
          </p>
        </div>
      </div>

      {/* Recent Messages Table */}
      <CustomTable
        title="Recent Messages"
        subtitle="Latest messages posted by users"
        columns={messageColumns}
        data={postsData?.data?.data || []}
        pagination={true}
        search={true}
        serverSide={true}
        onSearch={handleMessageSearch}
        onSort={handleMessageSort}
        onPageChange={handleMessagePageChange}
        searchTerm={messageSearchTerm}
        sortConfig={messageSortConfig}
        paginationData={postsData?.data?.pagination || {}}
        loading={isPostsLoading || isPostsFetching}
        searchableColumns={["content", "posted_by", "email"]}
        sortableColumns={[
          "post_number",
          "views",
          "created_at",
          "ranking",
          "current_value",
        ]}
        itemsPerPage={messageItemsPerPage}
        onItemsPerPageChange={handleMessageItemsPerPageChange}
      />

      {/* New Recent Users Table */}
      <CustomTable
        title="Recent Users"
        subtitle="Latest registered and active users"
        columns={userColumns}
        data={usersData?.data?.data || []}
        pagination={true}
        search={true}
        serverSide={true}
        onSearch={handleUserSearch}
        onSort={handleUserSort}
        onPageChange={handleUserPageChange}
        searchTerm={userSearchTerm}
        sortConfig={userSortConfig}
        paginationData={usersData?.data?.pagination || {}}
        loading={isUsersLoading || isUsersFetching}
        searchableColumns={["name", "email"]}
        sortableColumns={[
          "created_at",
          "name",
          "email",
          "total_messages",
          "total_views",
        ]}
        itemsPerPage={userItemsPerPage}
        onItemsPerPageChange={handleUserItemsPerPageChange}
      />
    </div>
  );
}
