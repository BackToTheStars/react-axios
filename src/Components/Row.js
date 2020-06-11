import React, { useState } from 'react';


function Row(props) {
  // name={el.name}
  // username={el.username}
  // email={el.email}
  // phone={el.phone}
  // city={el.address.city}
  // website={el.website}
  // company={el.company.name}
  // columns={columns}
  // uuidv4={uuidv4}

  const userData = [
    props.id,
    props.name,
    props.username,
    props.email,
    props.phone,
    props.city,
    props.website,
    props.company
  ];

  // вывести данные пользователей в таблицу - ok
  // возможность добавлять и удалять пользователей

  return (
    <tr>
      {userData.map(el => <td key={props.uuidv4} scope="col">{el}</td>)}
    </tr>
  );
};

export default Row;
