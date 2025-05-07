import { FC, useRef } from "react";
import { TFilterValues } from "../TYPE";
interface IPopulationInput {
  popChange: TFilterValues["popChange"];
  getInputValue: (inputEl: React.RefObject<HTMLInputElement | null>) => void;
}

const PopulationInput: FC<IPopulationInput> = ({
  popChange,
  getInputValue,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <input
      type="number"
      name="input-popul"
      id="popul"
      ref={inputRef}
      onChange={() => getInputValue(inputRef)}
      value={popChange}
    />
  );
};
export default PopulationInput;
