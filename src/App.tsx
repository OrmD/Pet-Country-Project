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
          <FilterBtn selectedValue={selectedValue} array={countries} />
        </div>

        <CountriesList />
      </main>
    </>
  );
}

export default App;
