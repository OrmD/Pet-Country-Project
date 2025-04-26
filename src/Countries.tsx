import axios from "axios";
import { JSX, JSXElementConstructor, useEffect, useState } from "react";
import { ICountryRaw, ICountryClean } from "./TYPE";

function CountriesList() {
  const [data, setData] = useState<ICountryClean[]>([]);
  const [loading, setLoading] = useState(false);

  async function getDataCountries() {
    const response = await axios.get<ICountryRaw[]>(
      "https://restcountries.com/v3.1/all?fields=name,capital,flags,region,population"
    );

    const cleanData: ICountryClean[] = response.data.map((country) => ({
      name: country.name.common,
      capital: country.capital?.[0] || "No capital",
      flags: country.flags.svg,
      population: country.population,
      region: country.region,
    }));
    setData(cleanData);
    console.log(response.data);
  }

  useEffect(() => {
    getDataCountries();
  }, []);

  return (
    <div>
      {data.map(
        (country: ICountryClean, index: number): JSX.Element => (
          <div key={index}>
            <img src={country.flags} alt="" />
            <h2>{country.name}</h2>
            <h3>{country.capital}</h3>
            <p>{country.population}</p>
            <p>{country.region}</p>
          </div>
        )
      )}
    </div>
  );
}
export default CountriesList;
