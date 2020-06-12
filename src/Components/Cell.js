import React from 'react';

function Cell(props) {

  return (
      <td key={props.i}>{props.data}</td>
  );
};

export default Cell;



