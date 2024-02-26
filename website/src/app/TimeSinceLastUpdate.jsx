import React, { useState, useEffect } from "react";

const TimeSinceLastUpdate = () => {
  const lastUpdate = new Date();
  lastUpdate.setHours(12, 0, 0, 0);

  // If the current time is earlier than 12:00, set lastUpdate to yesterday
  if (new Date() < lastUpdate) {
    lastUpdate.setDate(lastUpdate.getDate() - 1);
  }

  const calculateTimeSinceLastUpdate = () => {
    const currentTime = new Date();
    const timeDifference = currentTime - lastUpdate;
    const minutesSinceLastUpdate = Math.floor(
      timeDifference / (1000 * 60) / 60
    );

    return minutesSinceLastUpdate;
  };

  return (
    <div>
      <p>
        Last updated:{" "}
        {lastUpdate.toLocaleTimeString("en-GB", { timeZone: "Europe/Oslo" })}
      </p>
      <p>Time since last update: {calculateTimeSinceLastUpdate()} hours ago</p>
    </div>
  );
};

export default TimeSinceLastUpdate;
