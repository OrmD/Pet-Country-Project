import axios from "axios";
import { JSX, useEffect, useState, FC } from "react";

import {
  ICountryRaw,
  ICountryClean,
  TFilterActive,
  numberCountryRow,
} from "./TYPE";
import { pagination } from "./functions/Diff-functions";
import Skeleton from "./skeleton";

interface ICountiesProps {
  filterArray: ICountryClean[];
  sortArray: ICountryClean[];
  sortClick: TFilterActive["sortClick"];
  activeFilter: TFilterActive["activeFilter"];
}

export async function getDataCountries() {
  try {
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
  } catch (e) {
    console.error(e);
    return [];
  }
}

const CountriesList: FC<ICountiesProps> = ({
  activeFilter,
  filterArray,
  sortArray,
  sortClick,
}) => {
  const [data, setData] = useState<ICountryClean[]>([]);
  const [activeByttonP, setActiveButtonP] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  let starPos = activeByttonP * numberCountryRow;
  let endPos = starPos + numberCountryRow;
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const countries = await getDataCountries();
      if (countries.length > 0) {
        setData(countries);
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const numberPagination = pagination(
    data.length,
    filterArray.length,
    numberCountryRow,
    activeFilter
  );

  function activePaginationButton(value: number) {
    setActiveButtonP(value);
  }

  let sortOrFiltArr = sortClick !== 0 ? sortArray : filterArray;
  function sortOrnot() {
    if (!activeFilter && sortArray.length !== 0 && sortClick == 0) {
      return data;
    } else if (sortArray.length !== 0) {
      return sortArray;
    }

    return data;
  }
  let sortOrData = sortOrnot();
  return (
    <>
      <div className="table-countries">
        {loading ? (
          <Skeleton />
        ) : activeFilter ? (
          sortOrFiltArr.slice(starPos, endPos).map(
            (country: ICountryClean, index: number): JSX.Element => (
              <div key={index} className="country-row">
                <span>{starPos + index + 1}</span>
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
        ) : (
          sortOrData.slice(starPos, endPos).map(
            (country: ICountryClean, index: number): JSX.Element => (
              <div key={index} className="country-row">
                <span>{starPos + index + 1}</span>
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
        )}
      </div>
      <div className="pagination-block">
        {numberPagination.map(
          (e, index): JSX.Element => (
            <button
              type="button"
              key={index}
              onClick={() => activePaginationButton(index)}
              className={
                activeByttonP === index
                  ? "active paginationButton"
                  : "paginationButton"
              }
            >
              {e}
            </button>
          )
        )}
      </div>
    </>
  );
};
export default CountriesList;
