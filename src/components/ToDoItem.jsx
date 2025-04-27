import React from 'react';

const TodoItem = ({ todo, onComplete }) => (
  <li className="todo-item">
    <span>{todo.title} <em>({todo.username})</em></span>
    <button onClick={() => onComplete(todo.id)}>Complete</button>
  </li>
);

export default TodoItem;
