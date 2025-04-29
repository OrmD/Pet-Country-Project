import RegionSelect from "./Region";
import CountriesList, { getDataCountries } from "./Countries";
import PopulationInput from "./Population";
import { useEffect, useState } from "react";
import { ICountryClean } from "./TYPE";
import FilterBtn from "./FilterBtn";

function App() {
  const [countries, setCountries] = useState<ICountryClean[]>([]);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    undefined
  );

  const [filtArray, setFiltArray] = useState<ICountryClean[]>([]);
  const [activeFilter, setActiveFilter] = useState(false);
  useEffect(() => {
    if (filtArray.length !== 0) {
      setActiveFilter(true);
    }
  }, [filtArray]);

  const handleCkick = () => {
    setActiveFilter(false);
  };
  const renderNewArray = (
    func: (
      selectedValue: string | undefined,
      countries: ICountryClean[]
    ) => ICountryClean[]
  ) => {
    const resultArray = func(selectedValue, countries);
    setFiltArray(resultArray);
  };

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
          <PopulationInput />
          <RegionSelect
            countries={countries}
            onSelectChange={setSelectedValue}
          />
          <FilterBtn
            selectedValue={selectedValue}
            renderNewArray={renderNewArray}
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
