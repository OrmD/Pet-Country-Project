import axios from "axios";
import { useEffect, useState, FC } from "react";

import {
  ICountryRaw,
  ICountryClean,
  TFilterActive,
  numberCountryRow,
} from "../TYPE";
import { pagination } from "../functions/Diff-functions";
import Skeleton from "./Skeleton";
import JSXArrayCountry from "./JSXCountry";
import Pagination from "./Pagination";

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
          <JSXArrayCountry
            array={sortOrFiltArr}
            starPos={starPos}
            endPos={endPos}
          />
        ) : (
          <JSXArrayCountry
            array={sortOrData}
            starPos={starPos}
            endPos={endPos}
          />
        )}
      </div>
      <Pagination
        numberPagination={numberPagination}
        setActiveButtonP={setActiveButtonP}
        activeByttonP={activeByttonP}
      />
    </>
  );
};
export default CountriesList;
