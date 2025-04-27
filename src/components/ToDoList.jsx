import React from 'react';
import TodoItem from './ToDoItem';

const TodoList = ({ todos, onComplete }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <TodoItem key={todo.id} todo={todo} onComplete={onComplete} />
    ))}
  </ul>
);

export default TodoList;
