import { REGIONS } from "@/constants";
import Table from "../../Table";
import { TableContainerProps } from "./types";
import { fetchData } from "@/services";

const TableContainer = async ({
  region,
  numErrors,
  seed,
}: TableContainerProps) => {
  region =
    region &&
    [REGIONS.USA, REGIONS.RUSSIA, REGIONS.DEUTSCHLAND].includes(
      region as REGIONS
    )
      ? region
      : REGIONS.USA;
  numErrors = numErrors && !isNaN(Number(numErrors)) ? numErrors : "0";
  seed = seed && !isNaN(Number(seed)) ? seed : "0";

  const data = await fetchData(region as REGIONS, numErrors, seed);

  const headers = [
    { label: "ID", key: "id" },
    { label: "Name", key: "name" },
    { label: "Address", key: "address" },
    { label: "Phone", key: "phone" },
  ];

  return <Table headers={headers} initialData={data} />;
};

export default TableContainer;
