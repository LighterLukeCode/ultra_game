import React from "react";
import styles from "./pagination.module.scss";
import ReactPaginate from "react-paginate";

const Pagination = ({ onChangeCurrentPage }) => {
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
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default Pagination;
