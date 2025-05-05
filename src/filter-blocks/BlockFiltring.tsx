import { FC, useEffect, useState } from "react";
import FilterBtn, { newFilteredArray } from "./FilterBtn";
import RegionSelect from "./Region";
import PopulationInput from "./Population";
import { ICountryClean } from "../TYPE";
import SortAtoZ from "./SortAtoZ";

interface IBlockFiltring {
  countries: ICountryClean[];
  activeFilter: boolean;
  filtArray: ICountryClean[];
  setFiltArray: React.Dispatch<React.SetStateAction<ICountryClean[]>>;
  setActiveFilter: React.Dispatch<React.SetStateAction<boolean>>;
  setCountries: React.Dispatch<React.SetStateAction<ICountryClean[]>>;
  setSortArray: React.Dispatch<React.SetStateAction<ICountryClean[]>>;
  sortClick: number;
  setSortClick: React.Dispatch<React.SetStateAction<number>>;
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

  const renderNewArray = (
    func: (
      selectedValue: string | undefined,
      countries: ICountryClean[],
      popChange: string
    ) => ICountryClean[]
  ) => {
    const resultArray = func(selectedValue, countries, popChange);
    setFiltArray(resultArray);
  };

  useEffect(() => {
    // Якщо фільтрація активна, працюємо з відфільтрованим масивом, інакше - з оригінальним
    let arrayToSort = activeFilter ? filtArray : countries;

    // Створюємо копію масиву для уникнення мутації оригіналу
    let sorted = [...arrayToSort];

    // Оновлюємо стан в залежності від значення sortClick
    switch (sortClick) {
      case 0:
        // Якщо sortClick = 0, просто повертаємо вихідний масив (без сортування)
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
        // Якщо немає сортування, повертаємо поточний масив без змін
        setSortArray(arrayToSort);
        break;
    }
  }, [sortClick]); // Додано всі залежності

  const handleCkick = () => {
    setSelectedValue("");
    setPopChange("");
    setSortClick(0);
    setActiveFilter(false);
  };

  function getInput(inputEl: React.RefObject<HTMLInputElement | null>) {
    if (inputEl.current !== null) {
      setPopChange(inputEl.current.value);
    }
  }

  function classActive() {
    if (sortClick !== 0) {
      return "active";
    } else if (sortClick) {
      return "false";
    }
  }
  return (
    <div className="functional-block">
      <PopulationInput
        popChange={popChange}
        getInputValue={getInput}
        activefilter={activeFilter}
      />
      <RegionSelect
        countries={countries}
        onSelectChange={setSelectedValue}
        selectValue={selectedValue}
        activeFilter={activeFilter}
      />
      <FilterBtn
        selectedValue={selectedValue}
        renderNewArray={renderNewArray}
        popChange={popChange}
      >
        <button type="button" onClick={handleCkick} className={classActive()}>
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
