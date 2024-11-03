export interface CountryData {
  name: string;
  capital: string;
  population: string;
  flagUrl: string | unknown;
  id: string | number | bigint;
  likes: number;
  isDeleted?: boolean;
  countries?: CountryData[];
  index?: number;
  language?: string;
}
