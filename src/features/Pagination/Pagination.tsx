import { ArrowRight, ArrowLeft } from 'components/Icons';

import usePagination, { DOTS } from '../../hooks/usePagination';
import styles from './Pagination.module.css';

type Props = Pagination & {
  onPageChange: (selectedPage: number) => void;
};

function Pagination({ currentPage, totalPageCount, siblingCount = 1, onPageChange }: Props) {
  const paginationRange = usePagination({ currentPage, totalPageCount, siblingCount });

  if (totalPageCount <= 1) {
    return null;
  }

  const handlePageChange = (selectedPage: number) => {
    onPageChange(Number(selectedPage));
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPageCount) {
      onPageChange(currentPage + 1);
    }
  };

  const renderedPagination = paginationRange?.map((pageNumber, index) => {
    if (pageNumber === DOTS) {
      return (
        <li className={styles.dots} key={index}>
          ...
        </li>
      );
    }

    const isActive = pageNumber === currentPage;
    return (
      <li className={`${styles.item} ${isActive && styles.isActive}`} key={index}>
        <button className={styles.btn} onClick={() => handlePageChange(Number(pageNumber))}>
          {pageNumber}
        </button>
      </li>
    );
  });

  return (
    <ul className={styles.list}>
      <li className={styles.item}>
        <button className={styles.btn} onClick={handlePreviousPage}>
          <ArrowLeft />
        </button>
      </li>

      {renderedPagination}

      <li className={styles.item}>
        <button className={styles.btn} onClick={handleNextPage}>
          <ArrowRight />
        </button>
      </li>
    </ul>
  );
}

export default Pagination;
