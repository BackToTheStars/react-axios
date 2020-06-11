import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [users, setUsers] = useState([]);

  const requestHttp = () => {

    console.log('Load');

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
        console.log(response.data);
      });
  };

  // вывести данные пользователей в таблицу
  // возможность добавлять и удалять пользователей

  return (
    <div>
      <button onClick={requestHttp}>Load</button>
      <ul>
        {
          users.map(el => <li key={el.id}>{el.name}</li>)        }
      </ul>
    </div>
  );
};

export default App;
