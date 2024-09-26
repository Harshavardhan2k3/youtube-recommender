import React, { useState } from "react";

function Input({ onVideosFetched }) {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    if (!inputValue) {
      alert("Please enter a video URL");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/get-similar-videos", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoUrl: inputValue }),
      });


      const data = await response.json();
      console.log("Response data:", data);
      
      
      if (Array.isArray(data)) {
        onVideosFetched(data);
      } else {
        console.error("Unexpected data format received from API");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      alert("Failed to process the request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen h-16 mt-8 flex align-center justify-center">
      <div className="outline outline-2 outline-neutral-600 w-6/12 h-full bg-zinc-300 rounded-full flex items-center justify-between px-4">
        <input
          type="text"
          className="w-10/12 h-10 bg-transparent outline-none px-4 py-2"
          placeholder="Enter video URL here"
          value={inputValue}
          onChange={handleInputChange}
          disabled={isLoading}
        />
        <button
          className={`w-12 h-12 rounded-full flex items-center justify-center ${
            isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-slate-700 hover:bg-slate-600'
          }`}
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="w-6 h-6 border-t-2 border-white border-solid rounded-full animate-spin"></div>
          ) : (
            <i className="fas fa-search text-white"></i>
          )}
        </button>
      </div>
    </div>
  );
}

export default Input;