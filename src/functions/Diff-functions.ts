import { TFilterActive } from "../TYPE";

export function classActive(sortClick: number, activeFilter: boolean) {
  if (sortClick !== 0 || activeFilter) {
    return "active reset-btn";
  }
  return "reset-btn";
}

export function pagination(
  arrLength: number,
  filtArrLength: number,
  numberVisibleRows: number,
  activeFilter: TFilterActive["activeFilter"]
): number[] {
  let numberPagin: number;
  if (activeFilter) {
    numberPagin = Math.round(filtArrLength / numberVisibleRows);
  } else {
    numberPagin = Math.round(arrLength / numberVisibleRows);
  }

  let arrayNumbers: number[] = [];
  for (let index = 1; index <= numberPagin; index++) {
    arrayNumbers.push(index);
  }
  return arrayNumbers;
}
