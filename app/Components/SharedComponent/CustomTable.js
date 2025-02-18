"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function CustomTable({
  title,
  subtitle,
  columns = [],
  data = [],
  pagination = false,
  search = false,
  filter = false,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Only paginate if there are more than 20 items
  const shouldPaginate = data.length > 10;

  // Calculate pagination values
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = shouldPaginate
    ? data.slice(indexOfFirstItem, indexOfLastItem)
    : data;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const showPages = 3; // Number of pages to show before and after current page

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || // First page
        i === totalPages || // Last page
        (i >= currentPage - showPages && i <= currentPage + showPages) // Pages around current
      ) {
        pageNumbers.push(i);
      }
    }

    // Add ellipsis where needed
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
    <div className="bg-white dark:bg-[#1a1a1a] rounded-lg shadow-md p-6">
      <div className="lg:flex justify-between items-center mb-4">
        <h2 className="text-2xl font-medium mb-3 lg:mb-0">{title}</h2>
        <div className="flex gap-4">
          {search && (
            <div className="relative w-[50%] lg:w-full lg:max-w-[315px]">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search Anything"
                className=" w-full border bg-[#f9fafb] border-[#EAF1FF] rounded-lg p-2 pl-10"
              />
            </div>
          )}
          {filter && (
            <select className="border rounded-md px-3 py-1 text-sm bg-[#f9fafb]">
              <option>This month</option>
            </select>
          )}
        </div>
      </div>
      {subtitle && <p className="text-gray-500 text-sm mb-4">{subtitle}</p>}
      <Table>
        <TableHeader className="bg-[#f6f6f6] dark:bg-[#1a1a1a]  rounded-t-lg">
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={col.accessor}
                className="text-gray-800 dark:text-white font-bold py-4 px-6"
              >
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((row, index) => (
            <TableRow key={index}>
              {columns.map((col) => (
                <TableCell
                  key={col.accessor}
                  className="p-4 border-b border-[#f6f6f6]"
                >
                  {col.customCell ? col.customCell(row) : row[col.accessor]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* New Pagination Controls */}
      {pagination && shouldPaginate && (
        <div className="mt-6 flex justify-end">
          {" "}
          <div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>

                {getPageNumbers().map((pageNum, index) =>
                  pageNum === "..." ? (
                    <PaginationItem key={`ellipsis-${index}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        onClick={() => setCurrentPage(pageNum)}
                        isActive={currentPage === pageNum}
                        className="cursor-pointer"
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )}
    </div>
  );
}
