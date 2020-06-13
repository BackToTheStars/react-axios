import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import Row from './Components/Row'
import { v4 as uuidv4 } from 'uuid';

function App() {

  const columns=['Name', 'Username', 'Email', 'Phone', 'City', 'Website', 'Company'];
  const [users, setUsers] = useState([]);

  const onTaskSave = (user) => {
    const updatedUsers = users.map((el) => {
      if (el.id === user.id) return {...user};
      else return el;
    });
    setUsers(updatedUsers);
  }

  const requestHttp = () => {

    // console.log('Load');

    // fetch('https://jsonplaceholder.typicode.com/users')
    //   .then(response => response.json())
    //   .then(json => {
    //     setUsers(json);
    //     }
    //   );

    axios({
      method: 'get',
      url: 'https://jsonplaceholder.typicode.com/users',
    })
      .then((response) => {
        setUsers(response.data);
        // console.log(response.data);
      });
  };

  return (
    <div>
      <br />
      <a href="https://github.com/BackToTheStars/react-axios/tree/master/src"
         className="ml-2">
        https://github.com/BackToTheStars/react-axios/tree/master/src
      </a>
      <br />
      <p></p>
      <button type="submit" className="btn btn-primary ml-2"
              onClick={requestHttp}>Load</button>
      <p></p>
      {users[0] ? (
        <>
          <table className="table">
            <thead className="thead-light">
            <tr>
              <th scope="col">#</th>
              {columns.map(el => <th key={uuidv4()} scope="col">{el}</th>)}
            </tr>
            </thead>
            <tbody>
            {users.map(el => <Row key={el.id}
                                  user={el}
                                  onTaskSave={onTaskSave}
            />)}
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
};

export default App;



// вывести данные пользователей в таблицу
// возможность добавлять и удалять пользователей// возможность добавлять и удалять пользователей