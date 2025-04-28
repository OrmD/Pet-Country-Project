import { FC } from "react";
import { ICountryClean } from "./TYPE";
interface IFilterBtn {
  selectedValue: string | undefined;
  array: ICountryClean[];
}

function newFilteredArray(
  selectedValue: string | undefined,
  array: ICountryClean[]
) {
  let newArray: ICountryClean[];
  console.log(array);
}

const FilterBtn: FC<IFilterBtn> = ({ selectedValue, array }) => {
  return (
    <button
      type="button"
      className="btn-filter"
      onClick={() => newFilteredArray(selectedValue, array)}
    >
      Filter{selectedValue}
    </button>
  );
};

export default FilterBtn;
