"use client";
import React, { useState, useEffect } from "react";
import BarChart from "./BarChart";
import "./globals.css";

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
  const [lastUpdated, setLastUpdated] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchItems();
      setLoading(false);
      setItems(data);
    }
    fetchData();
    const now = new Date();
    const noon = new Date();
    noon.setHours(12, 0, 0, 0);

    const elapsedMilliseconds = now - noon;
    const elapsedHours = Math.floor(elapsedMilliseconds / 3600000); // 1 hour = 3600000 milliseconds
    const elapsedMinutes = Math.floor((elapsedMilliseconds % 3600000) / 60000); // 1 minute = 60000 milliseconds

    setLastUpdated(
      ` ${elapsedHours} timer og ${elapsedMinutes} minutter siden`
    );
  }, []);

  return (
    <div>
      <nav>
        <div className="socials">
          <a href="https://github.com/ivermoka">
            <img src="/github-icon.png" alt="brand" className="nav-brand"></img>
          </a>
        </div>

        <div>
          Sist oppdatert:
          {lastUpdated}
        </div>
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
