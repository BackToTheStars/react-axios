import React, {useState} from "react";

function Search(props) {
  const [searchValue, setSearchValue] = useState('');

  const searchFieldChanged = (e) => {
    setSearchValue(e.target.value);
    props.searchSave(searchValue, props.i);
  };

  return (
    <input
      className="form-control form-control-sm" // Search fields
      type="text"
      placeholder="filter..."
      onChange={searchFieldChanged}
      value={searchValue}
    />
  );
}

export default Search;

// вывести данные пользователей в таблицу - ok
// возможность добавлять и удалять пользователей// возможность добавлять и удалять пользователей
