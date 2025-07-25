import React, { useState } from "react";

const Todo = ({ id, value, Delete, Edit }) => {
  return (
    <div className="todo">
      <p id={id}>{value}</p>
      <button onClick={() => Edit(id)}>Edit</button>
      <button onClick={() => Delete(id)}>Delete</button>
    </div>
  );
};

export default Todo;
