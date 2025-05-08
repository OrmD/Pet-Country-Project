import { FC, JSX } from "react";
interface IPagination {
  numberPagination: number[];
  setActiveButtonP: React.Dispatch<React.SetStateAction<number>>;
  activeByttonP: number;
}
const Pagination: FC<IPagination> = ({
  numberPagination,
  setActiveButtonP,
  activeByttonP,
}) => {
  return (
    <div className="pagination-block">
      {numberPagination.map(
        (e, index): JSX.Element => (
          <button
            type="button"
            key={index}
            onClick={() => setActiveButtonP(index)}
            className={
              activeByttonP === index
                ? "active paginationButton"
                : "paginationButton"
            }
          >
            {e}
          </button>
        )
      )}
    </div>
  );
};
export default Pagination;
