import ResultPage from "./ResultPage";

const Home = async ({ params }) => {
  const { makeId, year } = await params;

  if (!makeId || !year) {
    return <div>Invalid parameters!</div>;
  }

  return <ResultPage makeId={makeId} year={year} />;
};

export default Home;
