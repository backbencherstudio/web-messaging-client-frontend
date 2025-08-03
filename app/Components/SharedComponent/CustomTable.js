"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaSearch, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { useState, useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import DebouncedSearch from "./DebouncedSearch";

// Add styles for smooth transitions
const tableStyles = {
  transition: "opacity 0.2s ease-in-out",
};

const headerCellStyles = {
  minWidth: "120px", // Minimum width for columns
  position: "relative",
  transition: "background-color 0.2s ease-in-out",
};

const sortIconStyles = {
  position: "absolute",
  right: "8px",
  top: "50%",
  transform: "translateY(-50%)",
  transition: "transform 0.2s ease-in-out",
};

export default function CustomTable({
  title,
  subtitle,
  columns = [],
  data = [],
  pagination = false,
  search = false,
  filter = false,
  onPageChange,
  // New props for server-side functionality
  serverSide = false,
  onSearch,
  onSort,
  searchTerm = "",
  sortConfig = {},
  paginationData = {},
  loading = false,
  searchableColumns = [],
  sortableColumns = [],
  itemsPerPage = 10,
  itemsPerPageOptions = [10, 20, 50, 100],
  onItemsPerPageChange,
}) {
  // 1. First define all state
  const [localCurrentPage, setLocalCurrentPage] = useState(1);
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const [localSortConfig, setLocalSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  // 2. Define data source first
  const tableData = serverSide ? data : data;
  const currentSearchTerm = serverSide ? searchTerm : localSearchTerm;
  const currentSortConfig = serverSide ? sortConfig : localSortConfig;

  // 3. Calculate filtered data
  const filteredData = useMemo(() => {
    if (serverSide || !currentSearchTerm.trim()) return tableData;

    return tableData.filter((item) => {
      const columnsToSearch =
        searchableColumns.length > 0
          ? searchableColumns
          : columns.map((col) => col.accessor);

      return columnsToSearch.some((accessor) => {
        const value = item[accessor];
        if (value == null) return false;

        if (typeof value === "string") {
          return value.toLowerCase().includes(currentSearchTerm.toLowerCase());
        }
        if (typeof value === "number") {
          return value.toString().includes(currentSearchTerm);
        }
        if (typeof value === "object" && value !== null) {
          return JSON.stringify(value)
            .toLowerCase()
            .includes(currentSearchTerm.toLowerCase());
        }
        return false;
      });
    });
  }, [tableData, currentSearchTerm, searchableColumns, columns, serverSide]);

  // 4. Calculate sorted data
  const sortedData = useMemo(() => {
    if (serverSide || !currentSortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      let aValue = a[currentSortConfig.key];
      let bValue = b[currentSortConfig.key];

      if (aValue == null) aValue = "";
      if (bValue == null) bValue = "";

      if (typeof aValue === "string" && typeof bValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) {
        return currentSortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return currentSortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, currentSortConfig, serverSide]);

  // 5. Now use sortedData for pagination
  const currentPage = serverSide
    ? paginationData.current_page
    : localCurrentPage;
  const totalPages = serverSide
    ? paginationData.total_pages
    : Math.ceil(sortedData.length / itemsPerPage);
  const hasNextPage = serverSide
    ? paginationData.has_next_page
    : currentPage < totalPages;
  const hasPrevPage = serverSide
    ? paginationData.has_previous_page
    : currentPage > 1;

  // Updated page change handler
  const handlePageChange = (page) => {
    if (serverSide) {
      onPageChange?.(page);
    } else {
      setLocalCurrentPage(page);
    }
  };

  // 🔥 FIXED: Handle sorting with proper field mapping
  const handleSort = (column) => {
    console.log("Sort clicked:", column); // Debug log

    const sortField = column.sortField || column.accessor;
    if (!sortableColumns.includes(sortField)) return;

    const newOrder =
      sortConfig.field === sortField && sortConfig.order === "asc"
        ? "desc"
        : "asc";

    onSort(sortField, newOrder);
  };

  // Get sort icon for column
  const getSortIcon = (accessor) => {
    const isSorted = serverSide
      ? currentSortConfig.field === accessor
      : currentSortConfig.key === accessor;

    if (!isSorted) {
      return <FaSort className="ml-1 text-gray-400" />;
    }

    const direction = serverSide
      ? currentSortConfig.order
      : currentSortConfig.direction;
    return direction === "asc" ? (
      <FaSortUp className="ml-1 text-blue-600" />
    ) : (
      <FaSortDown className="ml-1 text-blue-600" />
    );
  };

  // 🔥 FIXED: Handle search with proper callback
  const handleSearch = (value) => {
    console.log("Search triggered:", value); // Debug log

    if (serverSide) {
      onSearch?.(value);
    } else {
      setLocalSearchTerm(value);
      setLocalCurrentPage(1); // Reset local page on search
    }
  };

  // Pagination logic
  const shouldPaginate = serverSide
    ? paginationData.total_items > itemsPerPage
    : sortedData.length > 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = serverSide
    ? sortedData // Server-side data is already paginated
    : shouldPaginate
    ? sortedData.slice(indexOfFirstItem, indexOfLastItem)
    : sortedData;

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const showPages = 3;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - showPages && i <= currentPage + showPages)
      ) {
        pageNumbers.push(i);
      }
    }

    const withEllipsis = [];
    for (let i = 0; i < pageNumbers.length; i++) {
      if (i > 0 && pageNumbers[i] - pageNumbers[i - 1] > 1) {
        withEllipsis.push("...");
      }
      withEllipsis.push(pageNumbers[i]);
    }
    return withEllipsis;
  };

  return (
    <div className="bg-white dark:bg-custom-gradient rounded-lg shadow-md p-6">
      <div className="lg:flex justify-between items-center mb-4">
        <h2 className="md:text-2xl text-xl font-medium mb-3 lg:mb-0">
          {title}
        </h2>
        <div className="flex gap-4">
          {search && (
            <DebouncedSearch
              value={currentSearchTerm}
              onChange={handleSearch}
              placeholder="Search..."
              delay={500}
              disabled={loading}
            />
          )}
          {filter && (
            <select className="border rounded-md px-3 py-1 text-sm bg-[#f9fafb] dark:bg-transparent dark:text-white">
              <option>This month</option>
            </select>
          )}
        </div>
      </div>
      {subtitle && <p className="text-gray-500 text-sm mb-4">{subtitle}</p>}

      {/* Search results info */}
      {search && currentSearchTerm && (
        <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          {serverSide
            ? `Found ${paginationData.total_items || 0} result${
                paginationData.total_items !== 1 ? "s" : ""
              } for "${currentSearchTerm}"`
            : `Found ${filteredData.length} result${
                filteredData.length !== 1 ? "s" : ""
              } for "${currentSearchTerm}"`}
        </div>
      )}

      <div
        className="relative"
        style={{
          opacity: loading ? 0.7 : 1,
          ...tableStyles,
        }}
      >
        <Table>
          <TableHeader className="bg-[#f6f6f6] dark:bg-[#1a1a1a] rounded-t-lg sticky top-0 z-10">
            <TableRow>
              {columns.map((col) => {
                const sortField = col.sortField || col.accessor;
                const isSortable = sortableColumns.includes(sortField);
                const isCurrentlySorted = sortConfig.field === sortField;

                return (
                  <TableCell
                    key={col.accessor}
                    style={{
                      ...headerCellStyles,
                      backgroundColor: isCurrentlySorted
                        ? "rgba(59, 130, 246, 0.1)"
                        : "inherit",
                    }}
                    className={`
                      text-gray-800 dark:text-white font-bold py-4 px-6
                      ${
                        isSortable
                          ? "cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                          : ""
                      }
                      transition-colors duration-200
                    `}
                    onClick={isSortable ? () => handleSort(col) : undefined}
                  >
                    <div className="flex items-center justify-between pr-8">
                      <span>{col.label}</span>
                      {isSortable && (
                        <span
                          className="transform transition-transform duration-200"
                          style={sortIconStyles}
                        >
                          {sortConfig.field === sortField
                            ? sortConfig.order === "asc"
                              ? "↑"
                              : "↓"
                            : "↕"}
                        </span>
                      )}
                    </div>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHeader>

          <TableBody className="relative">
            {loading ? (
              // Enhanced loading skeleton with matching column widths
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow
                  key={index}
                  className="animate-pulse transition-opacity duration-200"
                >
                  {columns.map((col) => (
                    <TableCell
                      key={col.accessor}
                      className="p-4"
                      style={{ minWidth: headerCellStyles.minWidth }}
                    >
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : currentItems?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-16"
                >
                  <div className="flex flex-col items-center justify-center gap-3">
                    <svg
                      className="w-16 h-16 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                    <h3 className="text-xl font-medium text-gray-500">
                      {currentSearchTerm
                        ? "No search results found"
                        : "No Data Found"}
                    </h3>
                    <p className="text-gray-400">
                      {currentSearchTerm
                        ? `No records match "${currentSearchTerm}". Try different keywords.`
                        : "There are no records to display at the moment."}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              currentItems?.map((row, index) => (
                <TableRow
                  key={index}
                  className="transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  {columns.map((col) => (
                    <TableCell
                      key={col.accessor}
                      className="p-4 border-b border-[#f6f6f6]"
                      style={{ minWidth: headerCellStyles.minWidth }}
                    >
                      {col.customCell ? col.customCell(row) : row[col.accessor]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Updated Pagination Section */}
      {pagination && (
        <div className="mt-6 border-t dark:border-gray-700">
          <div className="py-4 px-2 flex justify-between items-center">
            {/* Items per page selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Show
              </span>
              <select
                value={itemsPerPage}
                onChange={(e) => onItemsPerPageChange?.(Number(e.target.value))}
                className="bg-transparent border rounded px-2 py-1 text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {itemsPerPageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                entries
              </span>
            </div>

            {/* Existing pagination controls */}
            <div className="flex items-center gap-2">
              {/* Results info */}
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {serverSide
                  ? `Showing ${
                      ((paginationData.current_page || 1) - 1) * itemsPerPage +
                      1
                    } to ${Math.min(
                      (paginationData.current_page || 1) * itemsPerPage,
                      paginationData.total_items || 0
                    )} of ${paginationData.total_items || 0} results`
                  : `Showing ${indexOfFirstItem + 1} to ${Math.min(
                      indexOfLastItem,
                      sortedData.length
                    )} of ${sortedData.length} results`}
              </div>

              {/* Pagination */}
              <Pagination className="justify-end">
                <PaginationContent className="flex items-center gap-2">
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        handlePageChange(Math.max(currentPage - 1, 1))
                      }
                      className={`whitespace-nowrap transition-colors ${
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    />
                  </PaginationItem>

                  {/* Desktop View */}
                  <div className="hidden sm:flex items-center gap-1">
                    {getPageNumbers().map((pageNum, index) =>
                      pageNum === "..." ? (
                        <PaginationItem key={`ellipsis-${index}`}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      ) : (
                        <PaginationItem key={pageNum}>
                          <PaginationLink
                            onClick={() => handlePageChange(pageNum)}
                            isActive={currentPage === pageNum}
                            className={`cursor-pointer min-w-[32px] h-8 flex items-center justify-center rounded transition-colors
                              ${
                                currentPage === pageNum
                                  ? "bg-primary dark:bg-transparent text-white"
                                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
                              }`}
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}
                  </div>

                  {/* Mobile View */}
                  <div className="flex sm:hidden items-center">
                    <select
                      value={currentPage}
                      onChange={(e) => handlePageChange(Number(e.target.value))}
                      className="bg-transparent border rounded px-2 py-1 text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        )
                      )}
                    </select>
                    <span className="mx-2 text-sm text-gray-600 dark:text-gray-400">
                      of {totalPages}
                    </span>
                  </div>

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        handlePageChange(Math.min(currentPage + 1, totalPages))
                      }
                      className={`whitespace-nowrap transition-colors ${
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
