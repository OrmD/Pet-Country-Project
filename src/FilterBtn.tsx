import { FC } from "react";
import { ICountryClean } from "./TYPE";
interface IFilterBtn {
  selectedValue: string | undefined;
  renderNewArray: (
    func: (
      selectedValue: string | undefined,
      countries: ICountryClean[]
    ) => ICountryClean[]
  ) => void;
  children: React.ReactNode;
}

function newFilteredArray(
  selectedValue: string | undefined,
  array: ICountryClean[]
): ICountryClean[] {
  let newArray: ICountryClean[] = array.filter((item) => {
    if (item.region === selectedValue) {
      return item;
    }
  });
  return newArray;
}

const FilterBtn: FC<IFilterBtn> = ({
  selectedValue,
  renderNewArray,
  children,
}) => {
  return (
    <>
      <button
        type="button"
        className="btn-filter"
        onClick={() => renderNewArray(newFilteredArray)}
      >
        Filter
      </button>
      {children}
    </>
  );
};

export default FilterBtn;
