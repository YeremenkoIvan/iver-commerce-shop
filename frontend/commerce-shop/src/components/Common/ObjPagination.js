import React from "react";
import Icon from "./Icon";

const ObjPagination = ({ currentPage, totalPages, setPage }) => {
  const handlePrev = () => {
    if (currentPage > 1) setPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setPage(currentPage + 1);
  };
  const renderPageNumbers = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`px-2 py-1 mx-1 rounded ${
            i === currentPage
              ? "bg-primary text-2xl text-gray-500"
              : "text-2xl rounded-full hover:bg-gray-300"
          }`}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex items-center space-x-2">
      <Icon
        icon="fa-circle-chevron-left"
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="px-3 py-1 text-2xl hover:text-gray-500"
      />
      {renderPageNumbers()}
      <Icon
        icon="fa-circle-chevron-right"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-3 py-1 text-2xl hover:text-gray-500 "
      />
    </div>
  );
};

export default ObjPagination;
