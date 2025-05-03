import { FC, useEffect, useState } from "react";
import FilterBtn from "./FilterBtn";
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
}
const BlockFiltring: FC<IBlockFiltring> = ({
  countries,
  activeFilter,
  filtArray,
  setFiltArray,
  setActiveFilter,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>("");
  const [popChange, setPopChange] = useState<number>(0);
  const [sortClick, setSortClick] = useState(0);

  useEffect(() => {
    if (filtArray.length !== 0) {
      setActiveFilter(true);
    }
  }, [filtArray]);

  const renderNewArray = (
    func: (
      selectedValue: string | undefined,
      countries: ICountryClean[],
      popChange: number
    ) => ICountryClean[]
  ) => {
    const resultArray = func(selectedValue, countries, popChange);
    switch (sortClick) {
      case 0:
        setFiltArray(resultArray);
        break;
      case 1:
        resultArray.sort((a, b) => a.population - b.population);
        break;
      case 2:
        resultArray.sort((a, b) => b.population - a.population);
        break;
      default:
        break;
    }
  };

  const handleCkick = () => {
    setSelectedValue("");
    setPopChange(0);
    setActiveFilter(false);
  };

  function getInput(inputEl: React.RefObject<HTMLInputElement | null>) {
    if (inputEl.current !== null) {
      setPopChange(Number(inputEl.current.value));
    }
    console.log(popChange);
  }

  return (
    <div className="functional-block">
      <PopulationInput popChange={popChange} getInputValue={getInput} />
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
        {activeFilter && (
          <button type="button" onClick={handleCkick}>
            Reset
          </button>
        )}
      </FilterBtn>
      <SortAtoZ sortClick={sortClick} setSortClick={setSortClick} />
    </div>
  );
};
export default BlockFiltring;
