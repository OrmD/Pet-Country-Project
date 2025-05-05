import { FC, useRef, useState } from "react";
interface IPopulationInput {
  popChange: number | string;
  getInputValue: (inputEl: React.RefObject<HTMLInputElement | null>) => void;
  activefilter: boolean;
}
const PopulationInput: FC<IPopulationInput> = ({
  popChange,
  getInputValue,
  activefilter,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <input
      type="number"
      name="input-popul"
      id="popul"
      ref={inputRef}
      onChange={() => getInputValue(inputRef)}
      value={activefilter ? "" : popChange}
    />
  );
};
export default PopulationInput;
