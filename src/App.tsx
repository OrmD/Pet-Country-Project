import "./App.css";
import RegionSelect from "./Region";
import CountriesList from "./Countries";
import PopulationInput from "./Population";

function App() {
  return (
    <>
      <main>
        <PopulationInput />
        <RegionSelect />
        <CountriesList />
      </main>
    </>
  );
}

export default App;
