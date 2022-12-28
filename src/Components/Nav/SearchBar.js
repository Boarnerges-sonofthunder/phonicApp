import React, { useEffect, useState, useRef } from "react";
import "../../Styles/searchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import e from "cors";

const SearchBar = ({ articles, setSearchTerm }) => {
  //const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  }

  return (
    <div className="search-box">
      <form>
        <input
          className="search-txt"
          type="text"
          name="searchText"
          placeholder="Rechercher un téléphone"
          // value={searchTerm}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default SearchBar;
