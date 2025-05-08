import CountriesList, { getDataCountries } from "./Countries";
import { useEffect, useState } from "react";
import { ICountryClean } from "./TYPE";
import BlockFiltring from "./filter-blocks/BlockFiltring";

function App() {
  const [countries, setCountries] = useState<ICountryClean[]>([]);
  const [filtArray, setFiltArray] = useState<ICountryClean[]>([]);
  const [sortArray, setSortArray] = useState<ICountryClean[]>([]);
  const [sortClick, setSortClick] = useState<number>(0);
  const [activeFilter, setActiveFilter] = useState(false);

  useEffect(() => {
    async function loadCountries() {
      const data = await getDataCountries();
      if (data) {
        setCountries(data);
      }
    }
    loadCountries();
  }, []);

  return (
    <>
      <main>
        <BlockFiltring
          countries={countries}
          activeFilter={activeFilter}
          filtArray={filtArray}
          setFiltArray={setFiltArray}
          setActiveFilter={setActiveFilter}
          setSortArray={setSortArray}
          sortClick={sortClick}
          setSortClick={setSortClick}
        />

        <CountriesList
          filterArray={filtArray}
          activeFilter={activeFilter}
          sortArray={sortArray}
          sortClick={sortClick}
        />
      </main>
    </>
  );
}

export default App;
