import React, { useState } from "react";

function Cell(props) {
  const [editedUser, setEditedUser] = useState({});
  const [editedField, setEditedField] = useState({});

  const editMode = (user, i, cellValue) => {
    if (!props.isAnotherCellEdited) {
      // блокирует одновременное редактирование другой ячейки
      setEditedUser(user);
      setEditedField({ index: i, value: cellValue });
      props.setIsAnotherCellEdited(true); // блокирует одновременное редактирование другой ячейки
    }
  };

  const onEditCellChange = (e, i) => {
    const columns = [
      "id",
      "name",
      "username",
      "email",
      "phone",
      "city",
      "website",
      "company",
    ];
    const field = columns[i];
    let newUser = {};
    if (field === "name") newUser = { ...editedUser, name: e.target.value };
    if (field === "username")
      newUser = { ...editedUser, username: e.target.value };
    if (field === "email") newUser = { ...editedUser, email: e.target.value };
    if (field === "phone") newUser = { ...editedUser, phone: e.target.value };
    if (field === "city") {
      newUser = { ...editedUser };
      newUser.address.city = e.target.value;
    }
    if (field === "website")
      newUser = { ...editedUser, website: e.target.value };
    if (field === "company") {
      newUser = { ...editedUser };
      newUser.company.name = e.target.value;
    }
    setEditedUser(newUser);
    setEditedField({ index: i, value: e.target.value });
  };

  const cellSave = () => {
    props.onUserSave(editedUser);
    setEditedUser({}); // refactor: можно это всё убрать в cellCancel(), но понимание ухудшится
    setEditedField({});
  };

  const cellCancel = () => {
    setEditedUser({});
    setEditedField({});
    props.setIsAnotherCellEdited(false); // позволяет снова открыть редактирование другой ячейки
  };

  return (
    <td>
      {props.user.id === editedUser.id && props.i === editedField.index ? (
        <>
          <input
            type="text"
            value={editedField.value}
            onChange={(e) => onEditCellChange(e, props.i)}
          />
          <button onClick={cellSave} disabled={!editedField.value.trim()}>
            Save
          </button>
          <button onClick={cellCancel}>Cancel</button>
        </>
      ) : (
        <span onDoubleClick={() => editMode(props.user, props.i, props.data)}>
          {props.data}
        </span>
      )}
    </td>
  );
}

export default Cell;
