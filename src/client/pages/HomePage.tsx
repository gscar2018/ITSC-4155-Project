import { useState } from "react";

function HomePage() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState("Data has not loaded yet");

  /**
   * Fetch data from the server and update the component state
   * @returns A Promise that resolves when the data is fetched and set in the component state
   */
  const fetchData = (): Promise<void> => {
    return fetch("/hello")
      .then((response: Response) => response.text())
      .then((data: string) => setData(data));
  };

  return (
    <div>
      <div>
        <h1 className="text-primary font-bold">
          Hello Vite + React + TypeScript
        </h1>
        <p>{data}</p>
        <button className="btn btn-ghost" onClick={() => fetchData()}>
          Fetch data from the server
        </button>
      </div>
    </div>
  );
}

export default HomePage;
