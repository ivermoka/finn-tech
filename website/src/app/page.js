"use client";
import React, { useState, useEffect } from "react";
import BarChart from "./BarChart";
import { fetchItems } from ".";
import "./globals.css";

function App() {
  const [items, setItems] = useState([]);
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchItems();
        if (data !== null) {
          console.log("items", data);
          setItems(data);
        } else {
          console.warn(
            "Data is null. There might be an issue with the fetch operation."
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
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
            <img src="github-icon.png" alt="brand" className="nav-brand"></img>
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
      {items === null ? (
        <div>
          Loading... <br />
          (If it loads forever, the data might be updating right now. Please
          wait.
        </div>
      ) : (
        <BarChart data={items} />
      )}
    </div>
  );
}

export default App;
