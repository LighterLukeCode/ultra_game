import React from "react";
import styles from "./pagination.module.scss";
import ReactPaginate from "react-paginate";

interface Props {
  currentPage: number;
  onChangeCurrentPage: (page: number) => void;
}

const Pagination: React.FC<Props> = ({ currentPage, onChangeCurrentPage }) => {
  return (
    <>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={e => onChangeCurrentPage(e.selected + 1)}
        pageRangeDisplayed={6}
        pageCount={3}
        previousLabel="<"
        renderOnZeroPageCount={() => {}}
        forcePage={currentPage - 1}
      />
    </>
  );
};

export default Pagination;
