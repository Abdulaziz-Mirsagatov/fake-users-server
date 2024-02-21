import TableContainer from "@/components/Organisms/Container/Table";
import Header from "@/components/Organisms/Header";
import { Suspense } from "react";

const HomePage = ({
  searchParams,
}: {
  searchParams: {
    region: string;
    numErrors: string;
    seed: string;
  };
}) => {
  const { region, numErrors, seed } = searchParams;

  return (
    <section className="flex-grow flex flex-col">
      <Header />
      <main className="p-16 flex-grow">
        <Suspense
          fallback={
            <h1 className="text-center text-light-gray text-xl">Loading...</h1>
          }
        >
          <TableContainer region={region} numErrors={numErrors} seed={seed} />
        </Suspense>
      </main>
    </section>
  );
};

export default HomePage;
