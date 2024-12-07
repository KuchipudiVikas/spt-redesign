import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationComponentProps {
  totalItems: number;
  page: number;
  setPage: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  totalItems,
  page,
  setPage,
}) => {
  const itemsPerPage = 20;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number, event: React.MouseEvent) => {
    event.preventDefault();
    if (page >= 1 && page <= totalPages) {
      setPage(page);
    }
  };

  const renderPaginationItems = () => {
    const paginationItems = [];
    const maxVisiblePages = 5;
    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(totalPages, page + 2);

    // Add first page and ellipsis if needed
    if (startPage > 1) {
      paginationItems.push(
        <PaginationItem key={1}>
          <PaginationLink
            href="#"
            onClick={(event) => handlePageChange(1, event)}
            isActive={1 === page}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        paginationItems.push(
          <PaginationItem key="start-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
      paginationItems.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            onClick={(event) => handlePageChange(i, event)}
            isActive={i === page}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Add last page and ellipsis if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        paginationItems.push(
          <PaginationItem key="end-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      paginationItems.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            href="#"
            onClick={(event) => handlePageChange(totalPages, event)}
            isActive={totalPages === page}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return paginationItems;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem
          style={{
            position: "relative",
          }}
        >
          <PaginationPrevious
            href="#"
            onClick={(event) => handlePageChange(page - 1, event)}
          />
          {page == 1 && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                cursor: "not-allowed",
              }}
            />
          )}
        </PaginationItem>
        {renderPaginationItems()}
        <PaginationItem
          style={{
            position: "relative",
          }}
        >
          <PaginationNext
            href="#"
            onClick={(event) => handlePageChange(page + 1, event)}
          />
          {page === totalPages && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                cursor: "not-allowed",
              }}
            />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
