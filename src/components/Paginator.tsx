interface PaginatorProps {
  cantidad: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  offset: number;
  limit: number;
}

export default function Paginator({
  cantidad,
  setOffset,
  offset,
  limit,
}: PaginatorProps) {
  const totalPages = Math.ceil(cantidad / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  const handlePageClick = (page: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const newOffset = (page - 1) * limit;
    setOffset(newOffset);
  };

  const getPageButtons = () => {
    const maxButtons = 10;
    const buttons = [];

    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = startPage + maxButtons - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    if (startPage > 1) {
      buttons.push(
        <li key="start-ellipsis" className="page-item disabled">
          <span className="page-link">...</span>
        </li>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      const isActive = i === currentPage;
      buttons.push(
        <li key={i} className={`page-item ${isActive ? "active" : ""}`}>
          <button
            onClick={() => handlePageClick(i)}
            className="page-link"
            disabled={isActive}
          >
            {i}
          </button>
        </li>
      );
    }

    if (endPage < totalPages) {
      buttons.push(
        <li key="end-ellipsis" className="page-item disabled">
          <span className="page-link">...</span>
        </li>
      );
    }

    return buttons;
  };

  return (
    <nav className="d-flex justify-content-center my-4">
      <ul className="pagination mb-0">
        {currentPage > 1 &&  (
          <>
          {currentPage > 3 && (
            <li className="page-item">
              <button
                onClick={() => handlePageClick(1)}
                className="page-link"
              >
                Primero
              </button>
            </li>
          )}
            
            <li className="page-item">
              <button
                onClick={() => handlePageClick(currentPage - 1)}
                className="page-link"
              >
                Anterior
              </button>
            </li>
          </>
        )}

        {getPageButtons()}

        {currentPage < totalPages && (
          <>
            <li className="page-item">
              <button
                onClick={() => handlePageClick(currentPage + 1)}
                className="page-link"
              >
                Siguiente
              </button>
            </li>
            <li className="page-item">
              <button
                onClick={() => handlePageClick(totalPages)}
                className="page-link"
              >
                Último
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
