
import { useState } from "react";

function TestPage() {
  const [data, setData] = useState("Data has not loaded yet");

  /**
   * Fetch data from the server and update the component state
   * @returns A Promise that resolves when the data is fetched and set in the component state
   */
  const fetchData = async (): Promise<void> => {
    const response = await fetch("/api/hello");
    const data = await response.text();
    return setData(data);
  };
  return (
    <div className="p-5 space-y-3">
      <h1 className="text-secondary">This is a TestPage</h1>
      <p className="text-info font-semibold border-b-2 border-primary w-1/2">
        {data}
      </p>
      <button className="btn btn-accent" onClick={() => fetchData()}>
        Fetch data from the server
      </button>
    </div>
  );
}

export default TestPage;
