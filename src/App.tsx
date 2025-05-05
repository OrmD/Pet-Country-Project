import CountriesList, { getDataCountries } from "./Countries";
import { useEffect, useState } from "react";
import { ICountryClean } from "./TYPE";
import BlockFiltring from "./filter-blocks/BlockFiltring";

function App() {
  const [countries, setCountries] = useState<ICountryClean[]>([]);
  const [filtArray, setFiltArray] = useState<ICountryClean[]>([]);
  const [activeFilter, setActiveFilter] = useState(false);

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
        <BlockFiltring
          countries={countries}
		  setCountries={setCountries}
          activeFilter={activeFilter}
          filtArray={filtArray}
          setFiltArray={setFiltArray}
          setActiveFilter={setActiveFilter}
        />

        <CountriesList filterArray={filtArray} activeFilter={activeFilter} />
      </main>
    </>
  );
}

export default App;
