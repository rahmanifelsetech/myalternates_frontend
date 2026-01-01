import React from 'react';
import { PaginationMeta } from '@shared/types/api';
import Button from '@shared/components/ui/button/Button';

interface PaginationProps {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ meta, onPageChange }) => {
  const { page, totalPages } = meta;

  const handlePrevious = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    let startPage: number, endPage: number;

    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (page <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (page + 2 >= totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = page - 2;
        endPage = page + 2;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-between items-center mt-4">
      <span className="text-sm text-gray-500">
        Page {page} of {totalPages}
      </span>
      <div className="flex items-center gap-2">
        <Button onClick={handlePrevious} disabled={page <= 1} variant="outline" size="sm">
          Previous
        </Button>
        <div className="flex items-center gap-1">
          {pageNumbers.map(number => (
            <Button
              key={number}
              onClick={() => onPageChange(number)}
              variant={page === number ? 'primary' : 'outline'}
              size="sm"
              className="w-9 h-9 p-0"
            >
              {number}
            </Button>
          ))}
        </div>
        <Button onClick={handleNext} disabled={page >= totalPages} variant="outline" size="sm">
          Next
        </Button>
      </div>
    </div>
  );
};