import TableContainer from "@/components/Organisms/Container/Table";

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

  return <TableContainer region={region} numErrors={numErrors} seed={seed} />;
};

export default HomePage;
