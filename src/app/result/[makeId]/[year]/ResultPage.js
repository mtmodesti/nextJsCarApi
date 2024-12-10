"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const ResultPage = ({ makeId, year }) => {
  const [models, setModels] = useState([]);
  const [modelName, setModelName] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchVehicleModels = async () => {
      try {
        const endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`;
        const response = await axios.get(endpoint);
        setModels(response.data.Results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching vehicle models:", error);
        setLoading(false);
      }
    };

    fetchVehicleModels();
  }, [makeId, year]);

  useEffect(() => {
    if (models.length) {
      setModelName(models[0].Make_Name);
    }
  }, [models]);

  const handleGoBack = () => {
    router.push("/");
  };

  if (loading) {
    return (
      <div className="text-center text-lg text-gray-500">Loading models...</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center py-12">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-8">
        <div className="flex justify-between mb-6">
          <button
            onClick={handleGoBack}
            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Back to Home Page
          </button>
        </div>

        <h2 className="text-2xl font-semibold text-center text-indigo-600 mb-8">
          Vehicle Models of {modelName} for the year {year}
        </h2>

        <div>
          <ul className="space-y-4">
            {models.length > 0 ? (
              models.map((model, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 text-lg text-gray-800">
                    <span className="font-semibold">{model.Make_Name}</span> -{" "}
                    {model.Model_Name}
                  </div>
                  <span className="text-sm text-gray-500">
                    {model.Model_ID}
                  </span>
                </li>
              ))
            ) : (
              <li className="text-lg text-center text-gray-500">
                No models found.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
