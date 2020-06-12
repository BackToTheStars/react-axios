import React, { useState } from 'react';


function Row(props) {

  const userData = [
    props.user.id,
    props.user.name,
    props.user.username,
    props.user.email,
    props.user.phone,
    props.user.address.city,
    props.user.website,
    props.user.company.name
  ];

  return (
    <tr>
      {userData.map((el,i) => <td key={i} scope="col">{el}</td>)}
    </tr>
  );
};

export default Row;




// вывести данные пользователей в таблицу - ok
// возможность добавлять и удалять пользователей
