import React from "react";
import { useState } from "react";

const SearchBarUser = (props) => {
    const [searchValue, setSearchValue] = useState("");
    const callback = props.callback;

    const changeSearchValue = (event) => {
        console.log(event.target.value);
        setSearchValue(event.target.value);
        callback(searchValue);
    }

    return (
        <input type="text" onChange={(event) => {changeSearchValue(event)}} />
    );
}

export default SearchBarUser;