import { useState } from "react";
import "./App.css";
import Todo from "./components/Todo";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddTodo = () => {
    if (todo.trim() !== "" && editingIndex !== null) {
      setTodos(todos.map((item, idx) => (idx === editingIndex ? todo : item)));
      setTodo("");
      setEditingIndex(null);
    } else if (todo.trim() !== "") {
      setTodos([...todos, todo]);
      setTodo("");
      setEditingIndex(null);
    } else {
      alert("Add Something");
    }
  };

  const handleEditTodo = (id) => {
    setEditingIndex(id);
    setTodo(todos.find((_, idx) => idx === id));
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((_, idx) => idx !== id));
  };

  return (
    <div className="container">
      <div className="main">
        <h1>Get Things Done !</h1>
        <div className="addTodo">
          <input
            type="text"
            placeholder="What is the task today?"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button onClick={handleAddTodo}>Add Task</button>
        </div>
        {todos.map((todo, idx) => (
          <Todo
            key={idx}
            id={idx}
            value={todo}
            Delete={handleDeleteTodo}
            Edit={handleEditTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
