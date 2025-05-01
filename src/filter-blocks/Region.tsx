import { FC } from "react";
import { ICountryClean } from "../TYPE";
interface regionType {
  activeFilter: boolean;
  countries: ICountryClean[];
  onSelectChange: (value: string) => void;
  selectValue: string | undefined;
}

const RegionSelect: FC<regionType> = ({
  countries,
  onSelectChange,
  activeFilter,
  selectValue,
}) => {
  const uniqueArray = countries.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.region === value.region)
  );

  function nonSelected(ativeFilter: boolean) {
    if (!ativeFilter) {
      return (
        <option value={undefined} selected>
          Не вибрано
        </option>
      );
    }
    return <option value={undefined}>Не вибрано</option>;
  }
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
