import Link from "next/link";

type PaginationProps = {
  page: number;
  pageSize: number;
  totalItems: number;
};
const Pagination = ({ page, pageSize, totalItems }: PaginationProps) => {
  const totalPage = Math.ceil(totalItems / pageSize);
  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      {page > 1 ? (
        <Link
          href={`/properties?page=${page - 1}`}
          className="border border-gray-300 rounded mr-2 px-2 py-1"
        >
          Previous
        </Link>
      ) : null}

      <span className="mx-2">
        Page {page} of {totalPage}
      </span>
      {page < totalPage ? (
        <Link
          href={`/properties?page=${page + 1}`}
          className="border border-gray-300 rounded ml-2 px-2 py-1"
        >
          Next
        </Link>
      ) : null}
    </section>
  );
};

export default Pagination;
