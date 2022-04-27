export default function Pagination({ page, total, changePage }) {
  const pages = Math.ceil(total / 3)
  return (
    <div className="page">
      {Array.from({ length: pages }, (_, i) => i + 1).map(pageIndex => {
        const isActive = pageIndex === page
        return isActive ? (
          <b className="page-num" key={pageIndex}>
            {" "}
            {pageIndex}{" "}
          </b>
        ) : (
          <span
            key={pageIndex}
            className="page-num"
            onClick={() => changePage(pageIndex)}
          >
            {"   "}
            {pageIndex}
            {"   "}
          </span>
        )
      })}
    </div>
  )
}
