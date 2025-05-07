import { FC } from "react";
import { ICountryClean, TFilterValues } from "../TYPE";
interface IFilterBtn {
  popChange: TFilterValues["popChange"];
  selectedValue: TFilterValues["selectedValue"];
  renderNewArray: (
    func: ({
      selectedValue,
      countries,
      popChange,
    }: TFilterValues) => ICountryClean[]
  ) => void;
  children: React.ReactNode;
}

export function newFilteredArray({
  selectedValue,
  countries,
  popChange,
}: TFilterValues): ICountryClean[] {
  let newArray: ICountryClean[] = countries.filter((item) => {
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
