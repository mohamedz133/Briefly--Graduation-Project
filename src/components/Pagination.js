import React from 'react';
import '../styles/pagenation.css';

function Pagination({ setPageNumber, pageNumber, totalPages }) {
    return (
        <div className="pagenation_parent">
            <div className="pagenation_parent_dec" onClick={() => {
                if (pageNumber > 1) {
                    setPageNumber((old) => old - 1);
                }
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" 
                     stroke={pageNumber > 1 ? "#ff0000" : "#000000"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="arcs">
                    <path d="M15 18l-6-6 6-6"></path>
                </svg> 
            </div>

            <span className="pagenation_parent_pg_no">Page : {pageNumber}</span>

            <div className="pagenation_parent_inc" onClick={() => {
                if (pageNumber < totalPages) { // Ensure not to exceed totalPages
                    setPageNumber((old) => old + 1);
                }
            }}>
                <svg className="inc-arrow" xmlns="http://www.w3.org/2000/svg" width="32" height="32" 
                     viewBox="0 0 24 24" fill="none" stroke={pageNumber < totalPages ? "#ff0000" : "#000000"} strokeWidth="2" 
                     strokeLinecap="round" strokeLinejoin="arcs">
                    <path d="M9 18l6-6-6-6"></path>
                </svg>
            </div>
        </div>
    );
}

export default Pagination;
