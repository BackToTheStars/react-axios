import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Row from "./Components/Row";
import Search from "./Components/Search";
// import { v4 as uuidv4 } from "uuid";

function App() {
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
  const [list, setList] = useState(users);
  const [isAnotherCellEdited, setIsAnotherCellEdited] = useState(false);
  const [isSpinnerShown, setIsSpinnerShown] = useState(false);

  const [filters, setFilters] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    city: "",
    website: "",
    company: "",
  });

  // for <Search> component
  const searchSave = (value, i) => {
    const updatedFilters = { ...filters };
    updatedFilters[columns[i].toLowerCase()] = value;
    setFilters(updatedFilters);
    setList(
      users.filter((el) => {
        return (
          el.name.toLowerCase().includes(updatedFilters.name.toLowerCase()) &&
          el.username
            .toLowerCase()
            .includes(updatedFilters.username.toLowerCase()) &&
          el.email.toLowerCase().includes(updatedFilters.email.toLowerCase()) &&
          el.phone.toLowerCase().includes(updatedFilters.phone.toLowerCase()) &&
          el.address.city
            .toLowerCase()
            .includes(updatedFilters.city.toLowerCase()) &&
          el.website
            .toLowerCase()
            .includes(updatedFilters.website.toLowerCase()) &&
          el.company.name
            .toLowerCase()
            .includes(updatedFilters.company.toLowerCase())
        );
      })
    );
    console.log(updatedFilters);
  };

  const resetFilters = () => {
    setFilters({
      name: "",
      username: "",
      email: "",
      phone: "",
      city: "",
      website: "",
      company: "",
    });
  };

  // ******* end for <Search /> component

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
    axios({
      method: "get",
      url:
        // "https://cors-anywhere.herokuapp.com/https://jsonplaceholder.typicode.com/users",
        "https://jsonplaceholder.typicode.com/users",
    })
      .then((response) => {
        setUsers(response.data);
        setIsSpinnerShown(false);
        handleScroll(); // сразу запускаем проверку, находится ли низ таблицы внизу страницы.
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // ************* Infinite scroll adder

  const [isLoading, setIsLoading] = useState(false);

  const handleScroll = () => {
    const innerHeight = window.innerHeight;
    const scrollTop = Math.round(document.documentElement.scrollTop);
    const offsetHeight = document.documentElement.offsetHeight;
    if (innerHeight + scrollTop < offsetHeight - 100) return;
    setIsLoading(true);
  };

  useEffect(() => {
    if (!isLoading) return;
    getMoreData();
  }, [isLoading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const getMoreData = () => {
    setIsLoading(true);
    axios({
      method: "get",
      url: "https://jsonplaceholder.typicode.com/users",
    })
      .then((response) => {
        let cloneUsers = [...users, ...response.data];
        cloneUsers = cloneUsers.map((el, i) => {
          return { ...el, id: i + 1 };
        });
        setUsers(cloneUsers);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // *********  End of Infinite scroll adder

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
          <button className="btn btn-secondary ml-2" onClick={resetFilters}>
            Reset filters
          </button>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th scope="col">#</th>
                {columns.map((el, i) => (
                  <th key={i} scope="col">
                    {el}
                    <Search i={i} searchSave={searchSave} />
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

// console.log(
//   "innerHeight=" +
//     innerHeight +
//     ", scrollTop=" +
//     scrollTop +
//     ", offsetHeight=" +
//     offsetHeight
// );

// console.log('Load');

// fetch('https://jsonplaceholder.typicode.com/users')
//   .then(response => response.json())
//   .then(json => {
//     setUsers(json);
//     }
//   );

// {/*🔍*/}
// {/*<div className="line">*/}
// {/*  <input className="search"*/}
// {/*         value="search">{null}</input>*/}
// {/*  <span className="search ml-1">{searchIcon}</span>*/}
// {/*</div>*/}
