import { FC } from "react";
import { ICountryClean } from "./TYPE";

const RegionSelect: FC<{ countries: ICountryClean[] }> = ({ countries }) => {
  const uniqueArray = countries.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.region === value.region)
  );

  return (
    <select name="select-region" id="select">
      {uniqueArray.map((country, index) => (
        <option value={country.region} key={index}>
          {country.region}
        </option>
      ))}
    </select>
  );
};
export default RegionSelect;
