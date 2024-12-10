"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import axios from "axios";

const FetchMakes = ({ setMakes, setLoading }) => {
  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/vehicles/GetMakesForVehicleType/car?format=json`;
        const response = await axios.get(endpoint);
        setMakes(response.data.Results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching vehicle makes:", error);
        setLoading(false);
      }
    };

    fetchMakes();
  }, [setMakes, setLoading]);

  return null;
};

export default function Home() {
  const [makes, setMakes] = useState([]);
  const [selectedMakeId, setSelectedMakeId] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!loading && makes.length > 0 && selectedMakeId === "") {
      setSelectedMakeId(makes[0].MakeId);
    }
  }, [makes, loading, selectedMakeId]);

  const years = [];
  for (let year = 2015; year <= new Date().getFullYear(); year++) {
    years.push(year);
  }

  const isButtonEnabled = selectedMakeId !== "" && selectedYear !== "";

  const handleNextClick = () => {
    if (isButtonEnabled) {
      const url = `/result/${selectedMakeId}/${selectedYear}`;
      router.push(url);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-lg p-8">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">
          Filter Vehicles
        </h1>

        <Suspense
          fallback={
            <div className="text-center text-gray-500">Loading makes...</div>
          }
        >
          <FetchMakes setMakes={setMakes} setLoading={setLoading} />
        </Suspense>

        {loading ? (
          <div className="text-center text-gray-500">Loading makes...</div>
        ) : (
          <div>
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700">
                Select Make
              </label>
              <select
                value={selectedMakeId}
                onChange={(e) => setSelectedMakeId(e.target.value)}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {makes.map((make, index) => (
                  <option key={index} value={make.MakeId}>
                    {make.MakeName}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700">
                Select Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={handleNextClick}
                disabled={!isButtonEnabled}
                className={`w-full py-2 px-4 rounded-lg text-white font-semibold 
                  ${
                    isButtonEnabled
                      ? "bg-indigo-600 hover:bg-indigo-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
              >
                Filter
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
