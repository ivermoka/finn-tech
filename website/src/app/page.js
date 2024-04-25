"use client";
import React, { useState, useEffect } from "react";
import BarChart from "./BarChart";
import "./globals.css";
import { FaSearch } from "react-icons/fa";
import TimeSinceLastUpdate from "./TimeSinceLastUpdate";
import SearchBar from "./SearchBar";

async function fetchItems() {
  try {
    const response = await fetch("/api", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Server Response:", response);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Fetched data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchItems();
      setLoading(false);
      setItems(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <nav>
        <div className="socials">
          <a href="https://github.com/ivermoka/finn-tech">
            <img src="/github-icon.png" alt="brand" className="nav-brand"></img>
          </a>
          <SearchBar data={items} />
        </div>

        <TimeSinceLastUpdate />
      </nav>
      <div className="title">
        <span>De mest ettertraktede jobbene nå</span>
      </div>

      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <BarChart data={items} />
      )}
    </div>
  );
}

export default App;
