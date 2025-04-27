import RegionSelect from "./Region";
import CountriesList, { getDataCountries } from "./Countries";
import PopulationInput from "./Population";
import { useEffect, useState } from "react";
import { ICountryClean } from "./TYPE";

function App() {
  const [countries, setCountries] = useState<ICountryClean[]>([]);

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
        <PopulationInput />
        <RegionSelect countries={countries} />
        <CountriesList />
      </main>
    </>
  );
}

export default App;
