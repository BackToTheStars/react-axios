import React from 'react';
import Cell from './Cell';


function Row(props) {

  const columns = [ // columns of the table
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
      {columns.map((el,i) => <Cell
        key={i}
        i={i}             // column #i -----------------
        data={el}         // data in the cell ----------
        user={props.user} // user object as it is
        columns={columns}

      />)}
    </tr>
  );
};

export default Row;


// вывести данные пользователей в таблицу - ok
// возможность добавлять и удалять пользователей