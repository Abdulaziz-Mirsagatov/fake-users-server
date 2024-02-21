"use client";

import { useEffect, useState } from "react";
import { TableProps } from "./types";
import { fetchDataClient } from "@/actions";
import { REGIONS } from "@/constants";
import { useInView } from "react-intersection-observer";
import "./styles.css";

const Table = <T extends Record<string, any>>({
  initialData,
  headers,
  region,
  numErrors,
  seed,
}: TableProps<T>) => {
  const [data, setData] = useState<T[]>(initialData);
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const loadMoreData = async () => {
    const next = page + 1;
    const newData = await fetchDataClient({
      region: region as REGIONS,
      numErrors,
      seed,
      page: next,
    });
    if (newData.length > 0) {
      setData((prev) => [...prev, ...newData]);
      setPage(next);
    }
  };

  useEffect(() => {
    if (inView) {
      loadMoreData();
    }
  }, [inView]);

  const renderValue = (value: T, key: string) => {
    if (Object.hasOwn(value, key)) {
      return value[key];
    }
    return "-";
  };

  return (
    <>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border-2 border-medium-dark text-center p-2 bg-light-gray">
              #
            </th>
            {headers.map((header) => (
              <th
                key={header.key}
                className="border-2 border-medium-dark text-center p-2 bg-light-gray"
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody key={Math.random()}>
          {data.map((row, index) => (
            <tr key={row.id}>
              <td
                key={index}
                className="border-2 border-medium-dark text-center p-2"
              >
                {index + 1}
              </td>
              {headers.map((header) => (
                <td
                  key={header.key}
                  className="border-2 border-medium-dark text-center p-2"
                >
                  {renderValue(row, header.key)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="w-full flex justify-center" ref={ref}>
        <div className="spinner"></div>
      </div>
    </>
  );
};

export default Table;
