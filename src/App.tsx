import RegionSelect from "./Region";
import CountriesList, { getDataCountries } from "./Countries";
import PopulationInput from "./Population";
import { useEffect, useState } from "react";
import { ICountryClean } from "./TYPE";
import FilterBtn from "./FilterBtn";

function App() {
  const [countries, setCountries] = useState<ICountryClean[]>([]);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    "Не вибрано"
  );

  const [filtArray, setFiltArray] = useState<ICountryClean[]>([]);
  const [activeFilter, setActiveFilter] = useState(false);
  const [popChange, setPopChange] = useState<number>(0);
  console.log(selectedValue);

  useEffect(() => {
    if (filtArray.length !== 0) {
      setActiveFilter(true);
    }
  }, [filtArray]);

  const handleCkick = () => {
    setSelectedValue(undefined);
    setActiveFilter(false);
  };

  const renderNewArray = (
    func: (
      selectedValue: string | undefined,
      countries: ICountryClean[],
      popChange: number
    ) => ICountryClean[]
  ) => {
    const resultArray = func(selectedValue, countries, popChange);
    setFiltArray(resultArray);
  };

  function getInput(inputEl: React.RefObject<HTMLInputElement | null>) {
    if (inputEl.current !== null) {
      setPopChange(Number(inputEl.current.value));
    }
    console.log(popChange);
  }

  useEffect(() => {
    async function loadCountries() {
      const data = await getDataCountries();
      setCountries(data);
    }
    loadCountries();
  }, []);

  return (
    <>
      <main>
        <div className="functional-block">
          <PopulationInput popChange={popChange} getInputValue={getInput} />
          <RegionSelect
            countries={countries}
            onSelectChange={setSelectedValue}
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
        </div>

        <CountriesList filterArray={filtArray} activeFilter={activeFilter} />
      </main>
    </>
  );
}

export default App;
