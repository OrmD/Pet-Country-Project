import { FC, useEffect, useState } from "react";
import FilterBtn from "./FilterBtn";
import RegionSelect from "./Region";
import PopulationInput from "./Population";
import { ICountryClean, TFilterActive, TFilterValues } from "../TYPE";
import SortAtoZ from "./SortAtoZ";
import { classActive } from "../functions/Diff-functions";

interface IBlockFiltring {
  countries: ICountryClean[];
  activeFilter: TFilterActive["activeFilter"];
  filtArray: ICountryClean[];
  setFiltArray: React.Dispatch<React.SetStateAction<ICountryClean[]>>;
  setActiveFilter: React.Dispatch<React.SetStateAction<boolean>>;
  setSortArray: React.Dispatch<React.SetStateAction<ICountryClean[]>>;
  sortClick: TFilterActive["sortClick"];
  setSortClick: TFilterActive["setSortClick"];
}
const BlockFiltring: FC<IBlockFiltring> = ({
  countries,
  activeFilter,
  filtArray,
  setFiltArray,
  setActiveFilter,
  setSortArray,
  setSortClick,
  sortClick,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>("");
  const [popChange, setPopChange] = useState<string>("");

  useEffect(() => {
    if (filtArray.length !== 0) {
      setActiveFilter(true);
    }
  }, [filtArray]);

  function renderNewArray(
    func: ({
      selectedValue,
      countries,
      popChange,
    }: TFilterValues) => ICountryClean[]
  ): void {
    const resultArray = func({ selectedValue, countries, popChange });
    setFiltArray(resultArray);
  }

  useEffect(() => {
    let arrayToSort = activeFilter ? filtArray : countries;

    let sorted = [...arrayToSort];

    switch (sortClick) {
      case 0:
        setSortArray(arrayToSort);
        break;
      case 1:
        // Сортуємо за спаданням
        setSortArray(sorted.sort((a, b) => b.population - a.population));
        break;
      case 2:
        // Сортуємо за зростанням
        setSortArray(sorted.sort((a, b) => a.population - b.population));
        break;
      default:
        setSortArray(arrayToSort);
        break;
    }
  }, [sortClick]);

  const handleCkick = () => {
    setSelectedValue("");
    setPopChange("");
    setSortClick(0);
    setActiveFilter(false);
  };

  function getInput(inputEl: React.RefObject<HTMLInputElement | null>) {
    if (inputEl.current !== null && +inputEl.current.value >= 0) {
      setPopChange(inputEl.current.value);
    }
  }

  return (
    <div className="functional-block">
      <PopulationInput popChange={popChange} getInputValue={getInput} />
      <RegionSelect
        countries={countries}
        onSelectChange={setSelectedValue}
        selectValue={selectedValue}
      />
      <FilterBtn
        selectedValue={selectedValue}
        renderNewArray={renderNewArray}
        popChange={popChange}
      >
        <button
          type="button"
          onClick={handleCkick}
          className={classActive(sortClick, activeFilter)}
        >
          Reset
        </button>
      </FilterBtn>
      <SortAtoZ
        sortClick={sortClick}
        setSortClick={setSortClick}
        countries={countries}
        activeFilter={activeFilter}
      />
    </div>
  );
};
export default BlockFiltring;
