import { REGIONS } from "@/constants";
import Header from "../../Header";
import Table from "../../Table";
import { TableContainerProps } from "./types";

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

  const res = await fetch(
    `${process.env.API_URL}/api/users?` +
      new URLSearchParams({ region, numErrors, seed }),
    {
      cache: "no-cache",
    }
  );
  const data = await res.json();

  const headers = [
    { label: "ID", key: "id" },
    { label: "Name", key: "name" },
    { label: "Address", key: "address" },
    { label: "Phone", key: "phone" },
  ];

  return (
    <section className="flex-grow flex flex-col">
      <Header />
      <main className="p-16 flex-grow">
        <Table headers={headers} data={data} />
      </main>
    </section>
  );
};

export default TableContainer;
