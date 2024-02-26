import React, { useState } from "react";

const SearchBar = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (searchTerm) => {
    const filteredResults = data.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredResults);
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
        onClick={() => setShowResults(!showResults)}
        value={searchTerm}
        onChange={handleChange}
        id="search"
      />
      {showResults && (
        <ul id="results">
          {searchResults.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
