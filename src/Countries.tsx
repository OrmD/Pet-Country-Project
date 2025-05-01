import axios from "axios";
import { JSX, useEffect, useState, FC } from "react";

import { ICountryRaw, ICountryClean } from "./TYPE";

interface ICountiesProps {
  filterArray: ICountryClean[];
  activeFilter: boolean;
}

export async function getDataCountries() {
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
  return cleanData;
}

const CountriesList: FC<ICountiesProps> = ({ activeFilter, filterArray }) => {
  const [data, setData] = useState<ICountryClean[]>([]);

  useEffect(() => {
    async function loadData() {
      const countries = await getDataCountries();
      setData(countries);
    }
    loadData();
  }, []);

  function pagination(arrLength: number, numberVisibleRows: number): number[] {
    let numberPagin: number = Math.round(arrLength / numberVisibleRows);
    let arrayNumbers: number[] = [];
    for (let index = 1; index <= numberPagin; index++) {
      arrayNumbers.push(index);
    }
    return arrayNumbers;
  }
  const number = pagination(250, 10);
  console.log(number);

  return (
    <div className="table-countries">
      {activeFilter
        ? filterArray.slice(0, 10).map(
            (country: ICountryClean, index: number): JSX.Element => (
              <div key={index} className="country-row">
                <div className="country-naming">
                  <div className="country-img">
                    <img src={country.flags} alt="" />
                  </div>
                  <h2>{country.name}</h2>
                  <h3>{country.capital}</h3>
                </div>
                <p className="country-population">
                  {country.population.toLocaleString("ru")}
                </p>
                <p className="counry-region">{country.region}</p>
              </div>
            )
          )
        : data.slice(0, 10).map(
            (country: ICountryClean, index: number): JSX.Element => (
              <div key={index} className="country-row">
                <div className="country-naming">
                  <div className="country-img">
                    <img src={country.flags} alt="" />
                  </div>
                  <h2>{country.name}</h2>
                  <h3>{country.capital}</h3>
                </div>
                <p className="country-population">
                  {country.population.toLocaleString("ru")}
                </p>
                <p className="counry-region">{country.region}</p>
              </div>
            )
          )}
    </div>
  );
};
export default CountriesList;
