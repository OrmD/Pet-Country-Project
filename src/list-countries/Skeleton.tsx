import { FC } from "react";
import { numberCountryRow } from "../TYPE";

const arr = Array(numberCountryRow)
  .fill(0)
  .map((_, i) => i + 1);
console.log(arr);

const Skeleton: FC = () => {
  return (
    <>
      {arr.map((index, e) => (
        <div className="skeleton" key={index}></div>
      ))}
    </>
  );
};
export default Skeleton;
