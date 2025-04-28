import { FC } from "react";
import { ICountryClean } from "./TYPE";
interface regionType {
  countries: ICountryClean[];
  onSelectChange: (value: string) => void;
}

const RegionSelect: FC<regionType> = ({ countries, onSelectChange }) => {
  const uniqueArray = countries.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.region === value.region)
  );

  return (
    <select
      name="select-region"
      id="select"
      onChange={(e) => onSelectChange(e.target.value)}
    >
      {uniqueArray.map((country, index) => (
        <option value={country.region} key={index}>
          {country.region}
        </option>
      ))}
    </select>
  );
};
export default RegionSelect;
