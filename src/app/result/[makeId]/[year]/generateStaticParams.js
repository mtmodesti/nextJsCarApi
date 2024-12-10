import axios from "axios";

export async function generateStaticParams() {
  const res = await axios.get(
    "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json",
  );

  const makes = res.data.Results;
  const years = [];
  for (let year = 2015; year <= new Date().getFullYear(); year++) {
    years.push(year);
  }

  const paths = makes.flatMap((make) =>
    years.map((year) => ({
      makeId: make.MakeId,
      year: year.toString(),
    })),
  );

  return paths.map(({ makeId, year }) => ({
    params: { makeId, year },
  }));
}
