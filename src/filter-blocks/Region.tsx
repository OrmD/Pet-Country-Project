import { FC } from "react";
import { TFilterValues } from "../TYPE";
interface regionType {
  countries: TFilterValues["countries"];
  onSelectChange: (value: string) => void;
  selectValue: TFilterValues["selectedValue"];
}

const RegionSelect: FC<regionType> = ({
  countries,
  onSelectChange,
  selectValue,
}) => {
  const uniqueArray = countries.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.region === value.region)
  );

  return (
    <select
      name="select-region"
      id="select"
      onChange={(e) => onSelectChange(e.target.value)}
      value={selectValue}
    >
      <option value="">Не вибрано</option>
      {uniqueArray.map((country, index) => (
        <option value={country.region} key={index}>
          {country.region}
        </option>
      ))}
    </select>
  );
};
export default RegionSelect;
