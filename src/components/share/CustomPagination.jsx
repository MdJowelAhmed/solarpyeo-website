import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const CustomPagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => {},
  maxVisiblePages = 8,
  scrollToTop = true, // optional
}) => {
  if (totalPages <= 1) return null;

  const goToPage = (page) => {
    onPageChange(page);

    if (scrollToTop) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 5) {
        for (let i = 1; i <= 6; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 4) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 5; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 2; i++)
          pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center mt-6">
      <div className="flex items-center gap-2">

        {/* Prev Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage <= 1}
          className="flex items-center justify-center w-8 h-8 p-0"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {/* Page Buttons */}
        {pageNumbers.map((num, i) =>
          num === "..." ? (
            <span
              key={`ellipsis-${i}`}
              className="px-3 py-1 text-gray-500 select-none"
            >
              ...
            </span>
          ) : (
            <Button
              key={num}
              size="sm"
              onClick={() => goToPage(num)}
              variant={currentPage === num ? "default" : "outline"}
              className={cn(
                "w-8 h-8 p-0 rounded-full",
                currentPage === num &&
                  "bg-primary text-white hover:bg-primary/90"
              )}
            >
              {num}
            </Button>
          )
        )}

        {/* Next Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="flex items-center justify-center w-8 h-8 p-0"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>

      </div>
    </div>
  );
};

export default CustomPagination;
