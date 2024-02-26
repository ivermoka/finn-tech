"use client";
import React, { useState, useEffect } from "react";
import BarChart from "./BarChart";
import "./globals.css";
import { FaSearch } from "react-icons/fa";

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
      const data = await fetchItems()
        .then(setLoading(false))
        .then(setItems(data));
    }
    fetchData();
    const now = new Date();
    const noon = new Date();
    noon.setHours(12, 0, 0, 0);

    let elapsedMilliseconds = now - noon;

    const isPastNoon = elapsedMilliseconds >= 0;

    if (!isPastNoon) {
      elapsedMilliseconds = noon - now;
    }

    const elapsedHours = Math.floor(elapsedMilliseconds / 3600000);
    const elapsedMinutes = Math.floor((elapsedMilliseconds % 3600000) / 60000);

    const timeSinceNoon = `${
      isPastNoon ? "" : "-"
    }${elapsedHours} timer og ${elapsedMinutes} minutter siden`;

    setLastUpdated(timeSinceNoon);
  }, []);

  return (
    <div>
      <nav>
        <div className="socials">
          <a href="https://github.com/ivermoka">
            <img src="/github-icon.png" alt="brand" className="nav-brand"></img>
          </a>
          <FaSearch style={{ paddingLeft: "20px", fontSize: "50px" }} />
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
