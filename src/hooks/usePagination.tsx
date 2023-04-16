import { useMemo } from 'react';

let DOTS: string;

function usePagination({ totalPageCount, siblingCount = 1, currentPage }: Pagination) {
  const paginationRange = useMemo(() => {
    const visiblePageNumbers = siblingCount + 5;

    const range = (start: number, end: number) => {
      const length = end - start + 1;
      return Array.from({ length }, (_, index) => index + start);
    };

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    if (totalPageCount <= visiblePageNumbers) {
      return range(1, totalPageCount);
    }

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);

      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalPageCount, siblingCount, currentPage]);

  return paginationRange;
}

export { DOTS };
export default usePagination;
