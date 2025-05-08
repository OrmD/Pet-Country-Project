import { FC, JSX } from "react";
import { ICountryClean } from "../TYPE";

interface IJSXArrayCountries {
  array: ICountryClean[];
  starPos: number;
  endPos: number;
}

const JSXArrayCountry: FC<IJSXArrayCountries> = ({
  array,
  starPos,
  endPos,
}) => {
  return array.slice(starPos, endPos).map(
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
  );
};
export default JSXArrayCountry;
