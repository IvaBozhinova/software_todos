import React, { useState } from "react";

const TodoForm = ({ onSubmit, users }) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !dueDate || !selectedUserId) {
      alert("Please, fill all fields.");
      return;
    }

    const selectedUser = users.find(user => user.id === parseInt(selectedUserId));

    const newTodo = {
      title,
      dueDate,
      completed: false,
      new: true,
      id: Date.now(),
      userId: selectedUser.id,
      username: selectedUser.username,
    };

    onSubmit(newTodo);
    setTitle("");
    setDueDate("");
    setSelectedUserId("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter todo name"
        value={title}
        onChange={(e) => setTitle(e.target.value)} />
              
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)} />
              
      <select
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)} >

        <option value="">Enter user</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.username}
          </option>
        ))}
      </select>
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;
