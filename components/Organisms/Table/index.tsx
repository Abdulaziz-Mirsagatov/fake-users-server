import { TableProps } from "./types";

const Table = <T extends Record<string, any>>({
  data,
  headers,
}: TableProps<T>) => {
  const renderValue = (value: T, key: string) => {
    if (Object.hasOwn(value, key)) {
      return value[key];
    }
    return "-";
  };

  return (
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
      <tbody>
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
  );
};

export default Table;
