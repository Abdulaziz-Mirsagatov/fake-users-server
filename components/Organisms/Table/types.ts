export interface TableHeader {
  label: string;
  key: string;
}

export interface TableProps<T> {
  data: T[];
  headers: TableHeader[];
}
