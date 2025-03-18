import { useState } from "react";

import "./App.css";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="rounded-lg bg-white p-8 shadow-md">
          <h1 className="text-3xl font-bold text-red-600">
            Vite + React + Tailwind CSS
          </h1>
          <p className="mt-2 text-gray-600">Your setup is working!</p>
        </div>
      </div>
    </>
  );
}

export default App;
