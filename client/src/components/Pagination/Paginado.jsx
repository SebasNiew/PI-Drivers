import style from "./Paginado.module.css";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  // Determina cuántas páginas mostrar antes de la página actual
  const pagesToShow = 6;
  const halfPagesToShow = Math.floor(pagesToShow / 2);

  let startPage = currentPage - halfPagesToShow;
  if (startPage < 1) {
    startPage = 1;
  }
  let endPage = startPage + pagesToShow - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = endPage - pagesToShow + 1;
    if (startPage < 1) {
      startPage = 1;
    }
  }

  const visiblePages = pageNumbers.slice(startPage - 1, endPage);

  return (
    <div className={style.container}>
      <div className={style.pages}>
        {currentPage > 1 && (
          <button onClick={() => onPageChange(currentPage - 1)}>Prev</button>
        )}
        {visiblePages.map((page) => (
          <div
            key={page}
            onClick={() => onPageChange(page)}
            className={`${style["page-number"]} ${
              currentPage === page ? style.active : ""
            }`}
          >
            {page}
          </div>
        ))}
        {currentPage < totalPages ? (
          <button onClick={() => onPageChange(currentPage + 1)}>
            Next
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default Pagination;
