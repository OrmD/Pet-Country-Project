import { FC } from "react";
import { ICountryClean } from "../TYPE";
interface IFilterBtn {
  popChange: number | string;
  selectedValue: string | undefined;
  renderNewArray: (
    func: (
      selectedValue: string | undefined,
      countries: ICountryClean[],
      popChange: string
    ) => ICountryClean[]
  ) => void;
  children: React.ReactNode;
}

export function newFilteredArray(
  selectedValue: string | undefined,
  array: ICountryClean[],
  popChange: string
): ICountryClean[] {
  let newArray: ICountryClean[] = array.filter((item) => {
    if (+popChange === 0) {
      if (item.region === selectedValue) {
        return item;
      }
    } else if (+popChange > 0 && selectedValue === "") {
      if (item.population >= +popChange) {
        return item;
      }
    } else {
      if (item.population >= +popChange && item.region === selectedValue) {
        return item;
      }
    }
  });
  return newArray;
}

const FilterBtn: FC<IFilterBtn> = ({ renderNewArray, children }) => {
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
