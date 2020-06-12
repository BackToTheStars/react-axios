import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import Row from './Components/Row'
import { v4 as uuidv4 } from 'uuid';

function App() {

  const columns=['Name', 'Username', 'Email', 'Phone', 'City', 'Website', 'Company'];

  const [users, setUsers] = useState([
    {
      "id": 1,
      "name": "Leanne Graham",
      "username": "Bret",
      "email": "Sincere@april.biz",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "1-770-736-8031 x56442",
      "website": "hildegard.org",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    }
  ]);

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
      <a href="https://github.com/BackToTheStars/react-axios/tree/master/src"
      className="ml-2">
        https://github.com/BackToTheStars/react-axios/tree/master/src
      </a>
      <br />
      <p></p>
      <button type="submit" className="btn btn-primary ml-2"
              onClick={requestHttp}>Load</button>
      <p></p>
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
                                uuidv4={uuidv4}
          />)}
        </tbody>
      </table>
    </div>
  );
};

export default App;



// вывести данные пользователей в таблицу
// возможность добавлять и удалять пользователей