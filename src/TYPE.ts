export const numberCountryRow: number = 10;
export interface ICountryRaw {
  capital?: string[];
  flags: {
    alt?: string;
    png: string;
    svg: string;
  };
  name: {
    common: string;
    official: string;
    nativeName?: { official: string; common: string };
  };
  population: number;
  region: string;
}

export interface ICountryClean {
  name: string;
  capital: string;
  flags: string;
  population: number;
  region: string;
}

export type TFilterValues = {
  selectedValue: string | undefined;
  countries: ICountryClean[];
  popChange: string;
};
export type TFilterActive = {
  activeFilter: boolean;
  sortClick: number;
  setSortClick: React.Dispatch<React.SetStateAction<number>>;
};
