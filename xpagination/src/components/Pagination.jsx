import React from "react";
import Styles from "./Pagination.module.css";

const Pagination = ({ currentPage, setCurrentPage, totaPages }) => {
  const handlePrevPage = () => {
    if(currentPage>1){
        setCurrentPage(prev => prev-1)
    }
  };

  const handleNextPage = () => {
    if(currentPage !== totaPages){
        setCurrentPage(prev => prev+1)
    }
  };
  return (
    <div className={Styles.wrapper}>
      <button disabled={currentPage === 1} onClick={handlePrevPage}>
        Previous
      </button>
      <p className={Styles.pageNumber}>{currentPage}</p>
      <button disabled={currentPage === totaPages} onClick={handleNextPage}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
