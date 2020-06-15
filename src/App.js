import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import Row from "./Components/Row";
import Search from "./Components/Search";
import { v4 as uuidv4 } from "uuid";

function App() {
  // const searchIcon = (
  //   <svg
  //     className="bi bi-search"
  //     width="1em"
  //     height="1em"
  //     viewBox="0 0 16 16"
  //     fill="currentColor"
  //     xmlns="http://www.w3.org/2000/svg"
  //   >
  //     <path
  //       fillRule="evenodd"
  //       d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
  //     />
  //     <path
  //       fillRule="evenodd"
  //       d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
  //     />
  //   </svg>
  // );

  const columns = [
    "Name",
    "Username",
    "Email",
    "Phone",
    "City",
    "Website",
    "Company",
  ];
  const [users, setUsers] = useState([]);
  const [isAnotherCellEdited, setIsAnotherCellEdited] = useState(false);
  const [isSpinnerShown, setIsSpinnerShown] = useState(false);
  const [searchFieldsArray, setSearchFieldsArray] = useState([
    // for <Search> component
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const searchSave = (searchString, index) => {
    // for <Search> component
    let cloneArray = searchFieldsArray.map((el, i) => {
      if (i === index) return searchString;
      else return el;
    });
    setSearchFieldsArray(cloneArray); // вот эта строка рождает проблему сброса всех значений search
    console.log(cloneArray);
  };

  const onUserSave = (user) => {
    const updatedUsers = users.map((el) => {
      // заменить user в общем списке users
      if (el.id === user.id) return { ...user };
      else return el;
    });
    setUsers(updatedUsers); // залить новый список users в State
    setIsAnotherCellEdited(false); // позволяет снова открыть редактирование другой ячейки
  };

  const requestHttp = () => {
    setIsSpinnerShown(true);

    // console.log('Load');

    // fetch('https://jsonplaceholder.typicode.com/users')
    //   .then(response => response.json())
    //   .then(json => {
    //     setUsers(json);
    //     }
    //   );

    axios({
      method: "get",
      url:
        "https://cors-anywhere.herokuapp.com/https://jsonplaceholder.typicode.com/users",
    }).then((response) => {
      setUsers(response.data);
      setIsSpinnerShown(false);
    });
  };

  return (
    <div>
      <br />
      <a
        href="https://github.com/BackToTheStars/react-axios/tree/master/src"
        className="ml-2"
      >
        https://github.com/BackToTheStars/react-axios/tree/master/src
      </a>
      <br />
      <p></p>
      <button
        type="submit"
        className="btn btn-primary ml-2"
        onClick={requestHttp}
        disabled={isSpinnerShown}
      >
        Load
      </button>
      {isSpinnerShown && <span className="ml-3">Loading...</span>}
      <p></p>
      {users[0] ? (
        <>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th scope="col">#</th>
                {columns.map((el, i) => (
                  <th key={uuidv4()} scope="col">
                    {el}
                    <Search i={i} searchSave={searchSave} />
                    {/*🔍*/}
                    {/*<div className="line">*/}
                    {/*  <input className="search"*/}
                    {/*         value="search">{null}</input>*/}
                    {/*  <span className="search ml-1">{searchIcon}</span>*/}
                    {/*</div>*/}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((el) => (
                <Row
                  key={el.id}
                  user={el}
                  onUserSave={onUserSave}
                  isAnotherCellEdited={isAnotherCellEdited}
                  setIsAnotherCellEdited={setIsAnotherCellEdited}
                />
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <p className="ml-2">No data loaded yet - please press "Load"</p>
        </>
      )}
    </div>
  );
}

export default App;

// вывести данные пользователей в таблицу
// возможность добавлять и удалять пользователей// возможность добавлять и удалять пользователей