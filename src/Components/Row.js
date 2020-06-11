import React, { useState } from 'react';


function Row(props) {

  // вывести данные пользователей в таблицу - ok
  // возможность добавлять и удалять пользователей

  return (
    <tr>
      <th scope="row">{props.user.id}</th>
      <td>{props.user.name}</td>
      <td>{props.user.username}</td>
      <td>{props.user.email}</td>
      <td>{props.user.phone}</td>
      <td>{props.user.address.city}</td>
      <td>{props.user.website}</td>
      <td>{props.user.company.name}</td>

      {props.columns.map(el => <th key={props.uuidv4()} scope="col">{el}</th>)}

    </tr>
  );
};

export default Row;
