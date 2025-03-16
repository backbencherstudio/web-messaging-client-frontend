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

export default function CustomPagingTable({
  title,
  subtitle,
  columns = [],
  data = [],
  pagination = false,
  search = false,
  filter = false,
  paginationData = {},
  onPageChange,
  onRowClick,
  rowClassName,
}) {
  // Remove the local pagination logic
  const { currentPage, totalPages } = paginationData;

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
    <div className="bg-white dark:bg-custom-gradient rounded-lg shadow-md p-6">
      <div className="lg:flex justify-between items-center mb-4">
        <h2 className="md:text-2xl text-xl font-medium mb-3 lg:mb-0">
          {title}
        </h2>
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
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-16">
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
                    No Data Found
                  </h3>
                  <p className="text-gray-400">
                    There are no records to display at the moment.
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            data.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => onRowClick?.(row)}
                className={rowClassName?.(row)}
              >
                {columns.map((col) => (
                  <TableCell
                    key={col.accessor}
                    className="p-4 border-b border-[#f6f6f6]"
                  >
                    {col.customCell ? col.customCell(row) : row[col.accessor]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* New Pagination Control*/}
      {pagination && totalPages > 1 && (
        <div className="mt-6 flex justify-end">
          <div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => onPageChange(currentPage - 1)}
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
                        onClick={() => onPageChange(pageNum)}
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
                    onClick={() => onPageChange(currentPage + 1)}
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
