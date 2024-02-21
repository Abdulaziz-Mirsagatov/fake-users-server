import { REGIONS } from "@/constants";

export interface TableHeader {
  label: string;
  key: string;
}

export interface TableProps<T> {
  initialData: T[];
  headers: TableHeader[];
  region: REGIONS;
  numErrors: string;
  seed: string;
}
