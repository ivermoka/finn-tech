import React, { useState } from "react";

const SearchBar = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (searchTerm) => {
    const filteredResults = data.filter((item) => {
      if (typeof item.tech === "string") {
        return item.tech.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return false;
    });
    const maxResults = 5;
    const limitedResults = filteredResults.slice(0, maxResults);

    setSearchResults(limitedResults);
  };

  const handleChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    handleSearch(term);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
        id="search"
      />
      {searchTerm !== "" && (
        <ul id="results">
          {searchResults.map((result, index) => (
            <li key={index} id="list">
              <p>{result.tech}</p>
              <p>{result.count}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
