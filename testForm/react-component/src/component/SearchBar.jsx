import React from "react";
import { useState } from "react";

const SearchBar = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const callback = props.callback;
  const defaultValue = props.defaultValue;

  const changeSearchValue = (event) => {
    setSearchValue(event.target.value);
    callback(event.target.value);
  };

  return (
    <input
      placeholder={defaultValue}
      type="text"
      onChange={(event) => {
        changeSearchValue(event);
      }}
    />
  );
};

export default SearchBar;
