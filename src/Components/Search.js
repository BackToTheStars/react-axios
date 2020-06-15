import React, { useState } from "react";

function Search(props) {
  const [searchValue, setSearchValue] = useState("");

  const searchFieldChanged = (event, index) => {
    event.preventDefault();
    setSearchValue(event.target.value);
    props.searchSave(event.target.value, index);
  };

  return (
    <input
      className="form-control form-control-sm" // Search fields
      type="text"
      placeholder="filter..."
      onChange={(e) => searchFieldChanged(e, props.i)}
      value={searchValue}
    />
  );
}

export default Search;

// вывести данные пользователей в таблицу - ok
// возможность добавлять и удалять пользователей// возможность добавлять и удалять пользователей
