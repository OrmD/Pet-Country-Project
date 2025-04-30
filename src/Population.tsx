import { FC, useRef, useState } from "react";
interface IPopulationInput {
  popChange: number;
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
      onInput={() => getInputValue(inputRef)}
      defaultValue={popChange}
    />
  );
};
export default PopulationInput;
